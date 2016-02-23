// Imports
import java.io.*;

// Htmlizer
public class Htmlizer
{
	// Members
	String m_outDirectory = "";
	String m_outFile = "";
	String m_jsonContent = "";
	public String m_jsFileName = "";
	public String m_htmlFileName = "";
	String m_jsDirectory = "../../public/js/";
	String m_cssDirectory = "../../public/css/";
	String m_imgDirectory = "../../public/images/";
	
	// Constructor
	public Htmlizer(String outDirectory, String outFile, String jsonContent) 
	{
		this.m_outDirectory = outDirectory;
		this.m_outFile = outFile;
		this.m_jsFileName = this.m_outDirectory + "/" + this.m_outFile + ".js";
		this.m_htmlFileName = this.m_outDirectory + "/" + this.m_outFile + ".html";
		this.m_jsonContent = jsonContent;
	}

	// Get javascript file name
	public String getJsFileName() 
	{
		return this.m_jsFileName;
	}

	// Get html file name
	public String getHtmlFileName() 
	{
		return this.m_htmlFileName;
	}

	// Process method creating javascript/html files
	void Process()
	{
		// Js file
		File jsFile = new File(m_jsFileName);
		if(!jsFile.exists())
		{
			try
			{
				jsFile.createNewFile();
				BufferedWriter jsWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(jsFile), "UTF8"));
				jsWriter.write(
						"var labelType, useGradients, nativeTextSupport, animate;\n" +
						"var colorCold = [0, 0, 200], colorWarm = [0, 200, 0];\n" +
						"var priorityAttribute = true, startAttribute = true, finishAttribute = true, durationAttribute = true, completeAttribute = true;\n" +
						"var treemap;\n\n"
				);
				jsWriter.write(
						"(function()\n" +
						"{\n" +
						"\tvar ua = navigator.userAgent,\n" +
						"\t\tiStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),\n" +
						"\t\ttypeOfCanvas = typeof HTMLCanvasElement,\n" +
						"\t\tnativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),\n" + 
						"\t\ttextSupport = nativeCanvasSupport && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');\n" +
						"\tlabelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';\n" + 
						"\tnativeTextSupport = labelType == 'Native';\n" +
						"\tuseGradients = nativeCanvasSupport;\n" +
						"\tanimate = !(iStuff || !nativeCanvasSupport);\n" +
						"})();\n\n"
				);
				jsWriter.write(
						"function RgbToHsl(r, g, b)\n" +
						"{\n" +
						"\tr /= 255, g /= 255, b /= 255;\n" +
						"\tvar max = Math.max(r, g, b), min = Math.min(r, g, b);\n" +
						"\tvar h, s, l = (max + min) / 2;\n" +
						"\tif(max == min)\n" +
						"\t{\n" +
						"\t\th = s = 0;\n" +
						"\t}\n" +
						"\telse\n" +
						"\t{\n" +
						"\t\tvar d = max - min;\n" +
						"\t\ts = l > 0.5 ? d / (2 - max - min) : d / (max + min);\n" +
						"\t\tswitch(max)\n" +
						"\t\t{\n" +
						"\t\t\tcase r: h = (g - b) / d + (g < b ? 6 : 0); break;\n" +
						"\t\t\tcase g: h = (b - r) / d + 2; break;\n" +
						"\t\t\tcase b: h = (r - g) / d + 4; break;\n" +
						"\t\t}\n" +
						"\t\th /= 6;\n" +
						"\t}\n" +
						"\treturn [h, s, l];\n" +
						"}\n\n"
				);
				jsWriter.write(
						"function HslToRgb(h, s, l)\n" +
						"{\n" +
						"\tvar r, g, b;\n" +
						"\tif(s == 0)\n" +
						"\t{\n" +
						"\t\tr = g = b = l;\n" +
						"\t}\n" +
						"\telse\n" +
						"\t{\n" +
						"\t\tfunction Hue2Rgb(p, q, t)\n" +
						"\t\t{\n" +
						"\t\t\tif(t < 0) t += 1;\n" +
						"\t\t\tif(t > 1) t -= 1;\n" +
						"\t\t\tif(t < 1/6) return p + (q - p) * 6 * t;\n" +
						"\t\t\tif(t < 1/2) return q;\n" +
						"\t\t\tif(t < 2/3) return p + (q - p) * (2/3 - t) * 6;\n" +
						"\t\t\treturn p;\n" +
						"\t\t}\n" +
						"\t\tvar q = l < 0.5 ? l * (1 + s) : l + s - l * s;\n" +
						"\t\tvar p = 2 * l - q;\n" +
						"\t\tr = Hue2Rgb(p, q, h + 1/3);\n" +
						"\t\tg = Hue2Rgb(p, q, h);\n" +
						"\t\tb = Hue2Rgb(p, q, h - 1/3);\n" +
						"\t}\n" +
						"\treturn [r*255, g*255, b*255];\n" +
						"}\n\n"
				);
				jsWriter.write(
						"function ColorBlendArray(color1, color2, ratio)\n" + 
						"{\n" + 
						"\tif((ratio < 0.0) || (ratio > 1.0))\n" + 
						"\t{\n" + 
						"\t\tratio = 0.5;\n" + 
						"\t}\n" + 
						"\tvar hsl1 = RgbToHsl(color1[0], color1[1], color1[2]);\n" + 
						"\tvar hsl2 = RgbToHsl(color2[0], color2[1], color2[2]);\n" + 
						"\tvar h = (1.0-ratio)*hsl1[0] + ratio*hsl2[0];\n" + 
						"\tvar s = (1.0-ratio)*hsl1[1] + ratio*hsl2[1];\n" + 
						"\tvar l = (1.0-ratio)*hsl1[2] + ratio*hsl2[2];\n" + 
						"\tvar result = HslToRgb(h, s, l);\n" + 
						"\treturn result;\n" + 
						"};\n\n"
				);	
				jsWriter.write(
						"function ColorBlend(color1, color2, ratio)\n" + 
						"{\n" + 
						"\tif((ratio < 0.0) || (ratio > 1.0))\n" + 
						"\t{\n" + 
						"\t\tratio = 0.5;\n" + 
						"\t}\n" + 
						"\tvar hsl1 = RgbToHsl(color1[0], color1[1], color1[2]);\n" + 
						"\tvar hsl2 = RgbToHsl(color2[0], color2[1], color2[2]);\n" + 
						"\tvar h = (1.0-ratio)*hsl1[0] + ratio*hsl2[0];\n" + 
						"\tvar s = (1.0-ratio)*hsl1[1] + ratio*hsl2[1];\n" + 
						"\tvar l = (1.0-ratio)*hsl1[2] + ratio*hsl2[2];\n" + 
						"\tvar result = HslToRgb(h, s, l);\n" + 
						"\treturn 'rgba(' + Math.round(result[0]) + ', ' + Math.round(result[1]) + ', ' + Math.round(result[2]) + ', 0)';\n" + 
						"};\n\n"
				);	
				jsWriter.write(
						"function ColorToHex(color)\n" +
						"{\n" +
						"\tvar m = /rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/.exec(color);\n" +
						"\treturn m ? (1 << 24 | m[1] << 16 | m[2] << 8 | m[3]).toString(16).substr(1) : color;\n" +
						"};\n\n"
				);	
				jsWriter.write(
						"var Log =\n" +
						"{\n" +
						"\telem: false,\n" +
						"\twrite: function(text)\n" +
						"\t{\n" +
						"\t\tif(!this.elem)\n" +
						"\t\t\tthis.elem = document.getElementById('log');\n" +
						"\t\tthis.elem.innerHTML = text;\n" +
						"\t\tthis.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';\n" +
						"\t}\n" +
						"};\n\n"
				);
				jsWriter.write(
						"function init()\n" +
						"{\n" +
						"\tvar json =\n" +
						m_jsonContent +
						";\n" +
						"\ttreemap = new $jit.TM.Squarified(\n" + 
						"\t{\n" +
						"\t\tinjectInto: 'infovis',\n" +
						"\t\ttitleHeight: 15,\n" +
						"\t\tlevelsToShow: 4,\n" +
						"\t\tanimate: animate,\n" +
						"\t\toffset: 0.2,\n" +
						"\t\tEvents:\n" +
						"\t\t{\n" +
						"\t\t\tenable: true,\n" +
						"\t\t\tonClick: function(node)\n" +
						"\t\t\t{\n" +
						"\t\t\t\tif(node) treemap.enter(node);\n" +
						"\t\t\t},\n" +
						"\t\t\tonRightClick: function()\n" + 
						"\t\t\t{\n" +
						"\t\t\t\ttreemap.out();\n" +
						"\t\t\t}\n" +
						"\t\t},\n" +
						"\t\tduration: 1000,\n" +
						"\t\tTips:\n" + 
						"\t\t{\n" +
						"\t\t\tenable: true,\n" +
						"\t\t\toffsetX: 20,\n" +
						"\t\t\toffsetY: 20,\n" +
						"\t\t\tonShow: function(tip, node, isLeaf, domElement)\n" + 
						"\t\t\t{\n" +
						"\t\t\t\tvar html = \"<div class=\\\"tip-title\\\">\" + node.name + \"</div><div class=\\\"tip-text\\\">\";\n" +
						"\t\t\t\tvar data = node.data;\n" +
						"\t\t\t\tif(data.priority && priorityAttribute)\n" + 
						"\t\t\t\t{\n" +
						"\t\t\t\t\thtml += \"<p></p>\";\n" +
						"\t\t\t\t\thtml += \"priority: \" + data.priority;\n" +
						"\t\t\t\t}\n" +
						"\t\t\t\tif(data.start && startAttribute)\n" + 
						"\t\t\t\t{\n" +
						"\t\t\t\t\thtml += \"<p></p>\";\n" +
						"\t\t\t\t\thtml += \"start: \" + data.start;\n" +
						"\t\t\t\t}\n" +
						"\t\t\t\tif(data.finish && finishAttribute)\n" + 
						"\t\t\t\t{\n" +
						"\t\t\t\t\thtml += \"<p></p>\";\n" +
						"\t\t\t\t\thtml += \"finish: \" + data.finish;\n" +
						"\t\t\t\t}\n" +
						"\t\t\t\tif(data.duration && durationAttribute)\n" + 
						"\t\t\t\t{\n" +
						"\t\t\t\t\thtml += \"<p></p>\";\n" +
						"\t\t\t\t\thtml += \"duration: \" + data.duration;\n" +
						"\t\t\t\t}\n" +
						"\t\t\t\tif(data.percentageComplete && completeAttribute)\n" + 
						"\t\t\t\t{\n" +
						"\t\t\t\t\thtml += \"<p></p>\";\n" +
						"\t\t\t\t\thtml += \"percent complete: \" + Math.round(100*data.percentageComplete) + \"%\";\n" +
						"\t\t\t\t}\n" +
						"\t\t\t\tif(data.milestone && (data.milestone == \"true\"))\n" + 
						"\t\t\t\t{\n" +
						"\t\t\t\t\thtml += \"<p></p>\";\n" +
						"\t\t\t\t\thtml += \"milestone: \" + data.milestone;\n" +
						"\t\t\t\t}\n" +
						"\t\t\t\tif(data.notes)\n" + 
						"\t\t\t\t{\n" +
						"\t\t\t\t\thtml += \"<p></p>\";\n" +
						"\t\t\t\t\thtml += \"notes: \" + data.notes;\n" +
						"\t\t\t\t}\n" +
						"\t\t\t\ttip.innerHTML =  html;\n" +
						"\t\t\t}\n" +
						"\t\t},\n" +
						"\t\tonBeforePlotNode: function(node)\n" + 
						"\t\t{\n" + 
						"\t\t\tif(node._depth > 0)\n" + 
						"\t\t\t{\n" + 
						"\t\t\t\tnode.data.$color = ColorToHex(ColorBlend(colorCold, colorWarm, node.data.percentageComplete));\n" + 
						"\t\t\t}\n" + 
						"\t\t},\n" + 
						"\t\tonCreateLabel: function(domElement, node)\n" + 
						"\t\t{\n" +
						"\t\t\tdomElement.innerHTML = node.name;\n" +
						"\t\t\tvar style = domElement.style;\n" +
						"\t\t\tstyle.display = '';\n" +
						"\t\t\tstyle.border = '4px solid transparent';\n" +
						"\t\t\tstyle.margin = '0px 0px 0px 0px';\n" +
						"\t\t\tdomElement.onmouseover = function()\n" + 
						"\t\t\t{\n" +
						"\t\t\t\tstyle.border = '4px solid #FF0000';\n" +
						"\t\t\t\tstyle.margin = '-4px 0px 0px -4px';\n" +
						"\t\t\t};\n" +
						"\t\t\tdomElement.onmouseout = function()\n" + 
						"\t\t\t{\n" +
						"\t\t\t\tstyle.border = '4px solid transparent';\n" +
						"\t\t\t\tstyle.margin = '0px 0px 0px 0px';\n" +
						"\t\t\t};\n" +
						"\t\t},\n" +
						"\t\trequest: function(nodeId, level, onComplete)\n" +
						"\t\t{\n" +
						"\t\t\tonComplete.onComplete(nodeId, level);\n" +
						"\t\t}\n" +
						"\t});\n" +
						"\ttreemap.loadJSON(json);\n" +
						"\ttreemap.refresh();\n" +
						"\tvar util = $jit.util;\n" +
						"\tvar back = $jit.id('back');\n" +
						"\t$jit.util.addEvent(back, 'click', function()\n" + 
						"\t{\n" +
						"\t\ttreemap.out();\n" +
						"\t});\n" +
						"}"
				);
				jsWriter.close();

				// Html file
				File htmlfile = new File(m_htmlFileName);
				if(!htmlfile.exists())
				{
					try
					{
						htmlfile.createNewFile();
						BufferedWriter htmlWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(htmlfile), "UTF8"));
						htmlWriter.write(
								"<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\n" + 
								"\t<head>\n" + 
								"\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n" +
								"\t\t<title>Project Management Mapper</title>\n\n" +
								"\t\t<!-- CSS Files -->\n" +
								"\t\t<link type=\"text/css\" href=\"" + m_cssDirectory + "base.css\" rel=\"stylesheet\" />\n" +
								"\t\t<link type=\"text/css\" href=\"" + m_cssDirectory + "Treemap.css\" rel=\"stylesheet\" />\n\n" +
								"\t\t<!--[if IE]><script language=\"javascript\" type=\"text/javascript\" src=\"" + m_jsDirectory + "jit-2.0.1/Extras/excanvas.js\"></script><![endif]-->\n\n" +
								"\t\t<!-- JIT Library File -->\n" +
								"\t\t<script language=\"javascript\" type=\"text/javascript\" src=\"" + m_jsDirectory + "jit-2.0.1/jit.js\"></script>\n\n" +
								"\t\t<!-- Data File -->\n" +
								"\t\t<script language=\"javascript\" type=\"text/javascript\" src=\"" + "./" + m_outFile + ".js" + "\"></script>\n\n" +						
								"\t\t<!-- Colors -->\n" +
								"\t\t<link type=\"text/css\" href=\"" + m_cssDirectory + "jquery-ui-1.8.18/ui-lightness/jquery-ui-1.8.18.custom.css\" rel=\"stylesheet\"/>\n" +
								"\t\t<script type=\"text/javascript\" src=\"" + m_jsDirectory + "jquery-1.7.1.min.js\"></script>\n" +
								"\t\t<script type=\"text/javascript\" src=\"" + m_jsDirectory + "jquery-ui-1.8.18/jquery-ui-1.8.18.custom.min.js\"></script>\n" +
								"\t\t<script>\n" +
								"\t\t\t$(function()\n" +
								"\t\t\t\t{\n" +
								"\t\t\t\t\t$(\"#colorSlider\").slider(\n" +
								"\t\t\t\t\t\t{\n" +
								"\t\t\t\t\t\t\tvalue: 0.02,\n" +
								"\t\t\t\t\t\t\tmin: 0,\n" +
								"\t\t\t\t\t\t\tmax: 1,\n" +
								"\t\t\t\t\t\t\tstep: 0.01,\n" +
								"\t\t\t\t\t\t\tslide: function(event, ui)\n" +
								"\t\t\t\t\t\t\t{\n" +
								"\t\t\t\t\t\t\t\tcolorCold = ColorBlendArray([0, 0, 200], [200, 0, 0], ui.value);\n" +
								"\t\t\t\t\t\t\t\tcolorWarm = [0, 200, 0];\n" +
								"\t\t\t\t\t\t\t\ttreemap.plot();\n" +
								"\t\t\t\t\t\t\t}\n" +
								"\t\t\t\t\t\t}\n" +
								"\t\t\t\t\t);\n" +
								"\t\t\t\t\t$(\"#priorityButton\").button();\n" +
								"\t\t\t\t\t$(\"#startButton\").button();\n" +
								"\t\t\t\t\t$(\"#finishButton\").button();\n" +
								"\t\t\t\t\t$(\"#durationButton\").button();\n" +
								"\t\t\t\t\t$(\"#completeButton\").button();\n" +
								"\t\t\t\t}\n" +
								"\t\t\t);\n" +
								"\t\t\tfunction onPriorityButtonClick(button)\n" +
								"\t\t\t{\n" +
								"\t\t\t\tpriorityAttribute = button.checked;\n" +
								"\t\t\t};\n" +
								"\t\t\tfunction onStartButtonClick(button)\n" +
								"\t\t\t{\n" +
								"\t\t\t\tstartAttribute = button.checked;\n" +
								"\t\t\t};\n" +
								"\t\t\tfunction onFinishButtonClick(button)\n" +
								"\t\t\t{\n" +
								"\t\t\t\tfinishAttribute = button.checked;\n" +
								"\t\t\t};\n" +
								"\t\t\tfunction onDurationButtonClick(button)\n" +
								"\t\t\t{\n" +
								"\t\t\t\tdurationAttribute = button.checked;\n" +
								"\t\t\t};\n" +
								"\t\t\tfunction onCompleteButtonClick(button)\n" +
								"\t\t\t{\n" +
								"\t\t\t\tcompleteAttribute = button.checked;\n" +
								"\t\t\t};\n" +
								"\t\t</script>\n" +							
								"\t</head>\n\n" +
								"\t<body onload=\"init();\">\n" +
								"\t\t<div id=\"container\">\n" +
								"\t\t\t<div id=\"left-container\">\n" +
								"\t\t\t\t<div class=\"text\">\n" +
								"\t\t\t\t\t<center>\n" +
								"\t\t\t\t\t\t<a href=\"@{PMM.index}\"><img src=\"" + m_imgDirectory + "logo.png\" width=\"340\" height=\"75\" alt=\"logo\"/></a>\n" +
								"\t\t\t\t\t</center>\n" +
								"\t\t\t\t</div>\n" +
								"\t\t\t\t<div id=\"id-list\">\n" +
								"\t\t\t\t\t<center>\n" +
								"\t\t\t\t\t<table>\n" +
								"\t\t\t\t\t\t<tr>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t\t<font size=\"2\" face=\"verdana\" color=\"gray\">Heat-color</font>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t\t<div id=\"colorSlider\" style=\"width:519px\"></div>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t</tr>\n" +
								"\t\t\t\t\t\t<tr>\n" +
								"\t\t\t\t\t\t</tr>\n" +
								"\t\t\t\t\t\t<tr>\n" +
								"\t\t\t\t\t\t</tr>\n" +
								"\t\t\t\t\t\t<tr>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t\t<font size=\"2\" face=\"verdana\" color=\"gray\">Task attributes</font>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t\t<td>\n" +
								"\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"priorityButton\" checked=\"checked\" onClick=\"onPriorityButtonClick(document.getElementById('priorityButton'))\"/><label for=\"priorityButton\"><font size=\"1\" face=\"verdana\">Priority</font></label>\n" +
								"\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"startButton\" checked=\"checked\" onClick=\"onStartButtonClick(document.getElementById('startButton'))\"/><label for=\"startButton\"><font size=\"1\" face=\"verdana\">Start-date</font></label>\n" +
								"\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"finishButton\" checked=\"checked\" onClick=\"onFinishButtonClick(document.getElementById('finishButton'))\"/><label for=\"finishButton\"><font size=\"1\" face=\"verdana\">Finish-date</font></label>\n" +
								"\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"durationButton\" checked=\"checked\" onClick=\"onDurationButtonClick(document.getElementById('durationButton'))\"/><label for=\"durationButton\"><font size=\"1\" face=\"verdana\">Duration</font></label>\n" +
								"\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"completeButton\" checked=\"checked\" onClick=\"onCompleteButtonClick(document.getElementById('completeButton'))\"/><label for=\"completeButton\"><font size=\"1\" face=\"verdana\">Completeness</font></label>\n" +
								"\t\t\t\t\t\t\t</td>\n" +
								"\t\t\t\t\t\t</tr>\n" +
								"\t\t\t\t\t</table>\n" +
								"\t\t\t\t\t</center>\n" +
								"\t\t\t\t</div>\n" +
								"\t\t\t</div>\n" +
								"\t\t\t<div id=\"center-container\">\n" +
								"\t\t\t\t<div id=\"infovis\"></div>   \n" + 
								"\t\t\t</div>\n" +
								"\t\t\t<div id=\"right-container\">\n" +
								"\t\t\t\t<div id=\"inner-details\"></div>\n" +
								"\t\t\t</div>\n" +
								"\t\t\t<div id=\"log\"></div>\n" +
								"\t\t</div>\n" +
								"\t</body>\n" +
								"</html>\n"
						);
						htmlWriter.close();
					}
					catch(IOException e) 
					{
						System.out.println("[Htmlizer::Process]\t" + e.toString());
					}
				}
				else
				{
				}
				
			}
			catch(IOException e) 
			{
				System.out.println("[Htmlizer::Process]\t" + e.toString());
			}
		}
		else
		{
		}
	}	
}
