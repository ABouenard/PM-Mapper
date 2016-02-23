// Imports
import java.io.*;
import java.util.List;
import java.util.Random;
import org.apache.commons.lang3.StringEscapeUtils;
import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.MPXJException;
import net.sf.mpxj.Task;
import net.sf.mpxj.mpx.MPXReader;
import net.sf.mpxj.mpp.MPPReader;

// Jsonizer
public class Jsonizer
{
	// Members
	String m_inDirectory = "";
	String m_inFile = "";
	String m_msFileName = "";
	String m_outDirectory = "";
	String m_outFile = "";
	String m_jsonFileName = "";
	MPPReader m_mppReader = new MPPReader();
	MPXReader m_mpxReader = new MPXReader();
	ProjectFile m_msFile = null;
	List<Task> m_tasks = null;
	static int m_depth = 1;

	// Constructor
	public Jsonizer(String inDirectory, String inFile, String outDirectory, String outFile) 
	{
		this.m_inDirectory = inDirectory;
		this.m_inFile = inFile;
		this.m_msFileName = this.m_inDirectory + "/" + this.m_inFile;
		this.m_outDirectory = outDirectory;
		this.m_outFile = outFile;
		this.m_jsonFileName = this.m_outDirectory + "/" + this.m_outFile + ".json";
		m_depth = 2;
	}
	
	// Randomize percentage of completeness if needed
	boolean Randomize(List<Task> listOfTasks)
	{
		// Number of deliverables
		int numDeliverables = listOfTasks.size();
		
		// Json result
		boolean result = true;
		
		// Jsonize
		for(int i=0; i<numDeliverables; i++)
		{
			Task task = listOfTasks.get(i);

			// It is possible that some tasks are null, in this case we simply skip it
			String name = task.getName();
			if(name == null)
			{
				continue;
			}
			
			// Percentage complete
			int percentageComplete = task.getPercentageComplete().intValue();
			result = result && (percentageComplete == 0);
			
			// Recurse through children
			if(listOfTasks.get(i).getChildTasks().size() > 0)
			{
				result = result && Randomize(listOfTasks.get(i).getChildTasks());
			}
			else
			{
			}
		}
		
		return result;
	}
	
	// Jsonize the list of tasks
	String Jsonize(List<Task> listOfTasks, boolean randomizing)
	{
		// Increment depth
		m_depth++;

		// Number of deliverables
		int numDeliverables = listOfTasks.size();
		
		// Json result
		String result = "";
		
		// Jsonize
		for(int i=0; i<numDeliverables; i++)
		{
			Task task = listOfTasks.get(i);
					
			// Unique ID
			int id = task.getUniqueID();

			// Name
			String name = task.getName();
			name = StringEscapeUtils.escapeJava(name);

			// It is possible that some tasks are null, in this case we simply skip it
			if(name == null)
			{
				continue;
			}
			
			// Priority
			int priority = task.getPriority().getValue();

			// Start-finish
			String start = task.getStart().toString();
			String finish = task.getFinish().toString();

			// Duration
			double duration = task.getDuration().getDuration();
			
			// Percentage complete
			double percentComplete = 0;
			if(randomizing)
			{
				Random seed = new Random();
				double ratio = seed.nextDouble();
				percentComplete = ratio;
			}
			else
			{
				percentComplete = 0.01*task.getPercentageComplete().doubleValue();
			}
			
			// Milestone
			Boolean milestone = task.getMilestone();
			
			// Notes
			String notes = task.getNotes();
			notes = StringEscapeUtils.escapeJava(notes);

			// Open node
			result += "\n";
			for(int d=0; d<m_depth; d++)
			{
				result += "\t";
			}
			result += "{";
			
			// Insert id
			result += "\n";
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "\"id\": ";
			result += "\"" + id + "\"";
			result += ",";

			// Insert name
			result += "\n";
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "\"name\": ";
			result += "\"" + name + "\"";
			result += ",";
			
			// Open data node
			result += "\n";
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "\"data\": ";
			result += "\n";
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "{\n";

			// Insert area parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"$area\": ";
			result += duration;
			result += ",\n";
			
			// Insert color parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"$color\": ColorToHex(ColorBlend(colorCold, colorWarm, " + percentComplete + "))";
			result += ",\n";
			
			// Insert priority parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"priority\": ";
			result += "\"" + priority + "\"";
			result += ",\n";
			
			// Insert start parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"start\": ";
			result += "\"" + start + "\"";
			result += ",\n";
			
			// Insert finish parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"finish\": ";
			result += "\"" + finish + "\"";
			result += ",\n";
			
			// Insert duration parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"duration\": ";
			result += "\"" + duration + "\"";
			result += ",\n";
			
			// Insert percentageComplete parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"percentageComplete\": ";
			result += "\"" + percentComplete + "\"";
			result += ",\n";
			
			// Insert milestone parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"milestone\": ";
			result += "\"" + milestone + "\"";
			result += ",\n";
			
			// Insert notes parameter
			for(int d=0; d<=m_depth+1; d++)
			{
				result += "\t";
			}
			result += "\"notes\": ";
			result += "\"" + notes + "\"";
			result += "\n";
			
			// Close data node
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "},";

			// Insert children (begin)
			result += "\n";
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "\"children\": ";
			result += "\n";
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "[";

			// Recurse through children
			if(task.getChildTasks().size() > 0)
			{
				result += Jsonize(task.getChildTasks(), randomizing);
			}
			else
			{
			}

			// Insert children (end)
			result += "\n";
			for(int d=0; d<=m_depth; d++)
			{
				result += "\t";
			}
			result += "]";

			// Close node
			result += "\n";
			for(int d=0; d<m_depth; d++)
			{
				result += "\t";
			}
			result += "}";
			
			// If not last, put comma
			if(i < numDeliverables-1)
			{
				result += ",";
			}
		}
		
		// Decrement depth
		m_depth--;
		
		return result;
	}

	// Process method creating the json file
	String Process() throws IOException
	{
		System.out.println("[Jsonizer::Process]\tMsp  file:\t" + "\"" + m_msFileName + "\"");
		
		String jsonResult = "";
		if(m_msFileName != "")
		{
			if(m_msFileName.contains("mpp"))
			{
				try 
				{
					m_msFile = m_mppReader.read(m_msFileName);
					m_tasks = m_msFile.getChildTasks();
				} 
				catch(MPXJException e) 
				{
					System.out.println("[Jsonizer::Process]\t" + e.toString());
				}
			}
			else if(m_msFileName.contains("mpx"))
			{
				try 
				{
					m_msFile = m_mpxReader.read(m_msFileName);
					m_tasks = m_msFile.getChildTasks();
				} 
				catch(MPXJException e) 
				{
					System.out.println("[Jsonizer::Process]\t" + e.toString());
				}
			}

			// Get tasks
			if(m_tasks.size() <= 1)
			{
				m_tasks = m_tasks.get(0).getChildTasks();
			}
			
			// If valid write json
			jsonResult += "\t{\n";
			jsonResult += "\t\t\"name\": \"" + (new File(m_msFileName)).getName() + "\",\n";
			jsonResult += "\t\t\"data\":\n\t\t{\n\t\t\t\"$color\": \"#606060\"\n\t\t},\n";
			jsonResult += "\t\t\"children\":\n\t\t[";
			if((m_msFile != null) && (m_tasks != null))
			{
				boolean randomize = Randomize(m_tasks);
				jsonResult += Jsonize(m_tasks, randomize);
			}
			else
			{
				System.out.println("[Jsonizer::Process]\tFormat not recognized");
				System.exit(0);
			}
			jsonResult += "\n\t\t]\n\t}";
			
			// Write file
			File jsonFile = new File(m_jsonFileName);
			jsonFile.createNewFile();
			BufferedWriter jsonWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(jsonFile), "UTF8"));
			jsonWriter.write(jsonResult);
			jsonWriter.close();
		}
		
		return jsonResult;
	}
}
