// Imports
import java.io.*;
import java.util.UUID;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.BasicParser;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.commons.cli.HelpFormatter;

// PMM
public class PMM 
{
	// Main method with input args
	public static void main(String[] args) throws ParseException, IOException
	{
		// Parser
		Options options = new Options();
		options.addOption("i", true, "input directory");
		options.addOption("p", true, "input file");
		options.addOption("o", true, "output directory");
		CommandLineParser clip = new BasicParser();
		CommandLine cli = clip.parse(options, args);
		HelpFormatter formatter = new HelpFormatter();
		formatter.printHelp("PM-Mapper-translator", options);
		
		// Launch process
		if(cli.hasOption("i") && cli.hasOption("p") && cli.hasOption("o"))
		{
			// Get options
			String inputDirectory = cli.getOptionValue("i");
			String inputFile = cli.getOptionValue("p");
			String outputDirectory = cli.getOptionValue("o");
			
			// Try to create corresponding directory
			String uuid = UUID.randomUUID().toString();
			outputDirectory += "/" + uuid;
			boolean couldCreateDirectory = (new File(outputDirectory)).mkdirs();
			if(couldCreateDirectory)
			{
				// Launch process
				Process(inputDirectory, inputFile, outputDirectory, uuid);
			}
			else
			{
				System.out.println("[PMM::main]\t\tCould not create output directory");
			}
		}
		else
		{
			System.out.println("[PMM::main]\t\tCould not parse valid options");
		}
	} 

	// Process function that produces json/javascript/html files
	static void Process(String inDirectory, String inFile, String outDirectory, String outFile) throws IOException
	{
		// Generate json from ms-project file
		Jsonizer jsonizer = new Jsonizer(inDirectory, inFile, outDirectory, outFile);
		String jsonContent = jsonizer.Process();
		
		// Generate html from json
		Htmlizer htmlizer = new Htmlizer(outDirectory, outFile, jsonContent);
		htmlizer.Process();

		// Log created files
		String jsFileName = htmlizer.getJsFileName();
		String htmlFileName = htmlizer.getHtmlFileName();
		System.out.println("[PMM::Process]\t\tJs   file:\t" + "\"" + jsFileName + "\"");
		System.out.println("[PMM::Process]\t\tHtml file:\t" + "\"" + htmlFileName + "\"");
	}
}