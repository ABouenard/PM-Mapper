var labelType, useGradients, nativeTextSupport, animate;
var colorCold = [0, 0, 200], colorWarm = [0, 200, 0];
var priorityAttribute = true, startAttribute = true, finishAttribute = true, durationAttribute = true, completeAttribute = true;
var treemap;

(function()
{
	var ua = navigator.userAgent,
		iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
		typeOfCanvas = typeof HTMLCanvasElement,
		nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
		textSupport = nativeCanvasSupport && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
	nativeTextSupport = labelType == 'Native';
	useGradients = nativeCanvasSupport;
	animate = !(iStuff || !nativeCanvasSupport);
})();

function RgbToHsl(r, g, b)
{
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if(max == min)
	{
		h = s = 0;
	}
	else
	{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max)
		{
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return [h, s, l];
}

function HslToRgb(h, s, l)
{
	var r, g, b;
	if(s == 0)
	{
		r = g = b = l;
	}
	else
	{
		function Hue2Rgb(p, q, t)
		{
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = Hue2Rgb(p, q, h + 1/3);
		g = Hue2Rgb(p, q, h);
		b = Hue2Rgb(p, q, h - 1/3);
	}
	return [r*255, g*255, b*255];
}

function ColorBlendArray(color1, color2, ratio)
{
	if((ratio < 0.0) || (ratio > 1.0))
	{
		ratio = 0.5;
	}
	var hsl1 = RgbToHsl(color1[0], color1[1], color1[2]);
	var hsl2 = RgbToHsl(color2[0], color2[1], color2[2]);
	var h = (1.0-ratio)*hsl1[0] + ratio*hsl2[0];
	var s = (1.0-ratio)*hsl1[1] + ratio*hsl2[1];
	var l = (1.0-ratio)*hsl1[2] + ratio*hsl2[2];
	var result = HslToRgb(h, s, l);
	return result;
};

function ColorBlend(color1, color2, ratio)
{
	if((ratio < 0.0) || (ratio > 1.0))
	{
		ratio = 0.5;
	}
	var hsl1 = RgbToHsl(color1[0], color1[1], color1[2]);
	var hsl2 = RgbToHsl(color2[0], color2[1], color2[2]);
	var h = (1.0-ratio)*hsl1[0] + ratio*hsl2[0];
	var s = (1.0-ratio)*hsl1[1] + ratio*hsl2[1];
	var l = (1.0-ratio)*hsl1[2] + ratio*hsl2[2];
	var result = HslToRgb(h, s, l);
	return 'rgba(' + Math.round(result[0]) + ', ' + Math.round(result[1]) + ', ' + Math.round(result[2]) + ', 0)';
};

function ColorToHex(color)
{
	var m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(color);
	return m ? (1 << 24 | m[1] << 16 | m[2] << 8 | m[3]).toString(16).substr(1) : color;
};

var Log =
{
	elem: false,
	write: function(text)
	{
		if(!this.elem)
			this.elem = document.getElementById('log');
		this.elem.innerHTML = text;
		this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
	}
};

function init()
{
	var json =
	{
		"name": "MicrosoftOfficeProject2003deployment.mpp",
		"data":
		{
			"$color": "#606060"
		},
		"children":
		[
			{
				"id": "1",
				"name": "Microsoft Office Project 2003 Deployment",
				"data": 
				{
					"$area": 125.75,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9646320145249958)),
					"priority": "500",
					"start": "Mon Sep 15 08:00:00 EDT 2003",
					"finish": "Mon Mar 08 15:00:00 EST 2004",
					"duration": "125.75",
					"percentageComplete": "0.9646320145249958",
					"milestone": "false",
					"notes": "This Project template is designed to facilitate the deployment of Microsoft Office Project 2003 in a corporate environment.  The template is designed to focus the implementation on key steps that can ensure a successful, well-planned implementation.\n\nSee Help to learn more about each section of this template and where to find additional information.\n\nFor information on the EPM Enterprise Implementation Framework, see http://www.microsoft.com/project/.\n"
				},
				"children": 
				[
				{
					"id": "2",
					"name": "Envisioning",
					"data": 
					{
						"$area": 8.5,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.41617316694513107)),
						"priority": "500",
						"start": "Mon Sep 15 08:00:00 EDT 2003",
						"finish": "Thu Sep 25 12:00:00 EDT 2003",
						"duration": "8.5",
						"percentageComplete": "0.41617316694513107",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "3",
						"name": "Evaluate corporate business objectives (per EPM Enterprise Implementation Framework)",
						"data": 
						{
							"$area": 20.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8362121347472727)),
							"priority": "500",
							"start": "Mon Sep 15 08:00:00 EDT 2003",
							"finish": "Wed Sep 17 12:00:00 EDT 2003",
							"duration": "20.0",
							"percentageComplete": "0.8362121347472727",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "4",
						"name": "Determine technology goals and objectives",
						"data": 
						{
							"$area": 2.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12078757512342864)),
							"priority": "500",
							"start": "Wed Sep 17 13:00:00 EDT 2003",
							"finish": "Fri Sep 19 12:00:00 EDT 2003",
							"duration": "2.0",
							"percentageComplete": "0.12078757512342864",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "5",
						"name": "Formulate preliminary cost/benefit analysis",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.25359233078238086)),
							"priority": "500",
							"start": "Fri Sep 19 13:00:00 EDT 2003",
							"finish": "Mon Sep 22 12:00:00 EDT 2003",
							"duration": "1.0",
							"percentageComplete": "0.25359233078238086",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "6",
						"name": "Determine project vision and scope (for example, lab, pilot, international/regional deployment, coexistence strategies)",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6736054495524699)),
							"priority": "500",
							"start": "Mon Sep 22 13:00:00 EDT 2003",
							"finish": "Tue Sep 23 12:00:00 EDT 2003",
							"duration": "1.0",
							"percentageComplete": "0.6736054495524699",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "7",
						"name": "Determine major milestones",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19557701420954876)),
							"priority": "500",
							"start": "Tue Sep 23 13:00:00 EDT 2003",
							"finish": "Wed Sep 24 12:00:00 EDT 2003",
							"duration": "1.0",
							"percentageComplete": "0.19557701420954876",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "8",
						"name": "Secure executive sponsorship/funding",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14566709052092508)),
							"priority": "500",
							"start": "Wed Sep 24 13:00:00 EDT 2003",
							"finish": "Thu Sep 25 12:00:00 EDT 2003",
							"duration": "1.0",
							"percentageComplete": "0.14566709052092508",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "9",
						"name": "Envisioning complete",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4805195554135995)),
							"priority": "500",
							"start": "Thu Sep 25 12:00:00 EDT 2003",
							"finish": "Thu Sep 25 12:00:00 EDT 2003",
							"duration": "0.0",
							"percentageComplete": "0.4805195554135995",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					}
					]
				},
				{
					"id": "10",
					"name": "Planning",
					"data": 
					{
						"$area": 7.5,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15241956941423607)),
						"priority": "500",
						"start": "Thu Sep 25 12:00:00 EDT 2003",
						"finish": "Mon Oct 06 17:00:00 EDT 2003",
						"duration": "7.5",
						"percentageComplete": "0.15241956941423607",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "11",
						"name": "Plan Software Configuration",
						"data": 
						{
							"$area": 3.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.38968461643329433)),
							"priority": "500",
							"start": "Thu Sep 25 12:00:00 EDT 2003",
							"finish": "Tue Sep 30 12:00:00 EDT 2003",
							"duration": "3.0",
							"percentageComplete": "0.38968461643329433",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "12",
							"name": "Design Impelementation Configuration",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8201119477372937)),
								"priority": "500",
								"start": "Thu Sep 25 12:00:00 EDT 2003",
								"finish": "Fri Sep 26 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.8201119477372937",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "13",
								"name": "Business analysis completed per EPM Enterprise Implementation Framework",
								"data": 
								{
									"$area": 0.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6317144989555042)),
									"priority": "500",
									"start": "Thu Sep 25 12:00:00 EDT 2003",
									"finish": "Thu Sep 25 12:00:00 EDT 2003",
									"duration": "0.0",
									"percentageComplete": "0.6317144989555042",
									"milestone": "true",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "14",
								"name": "Configuration settings determined and documented per EPM Enterprise Implementation Framework",
								"data": 
								{
									"$area": 0.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8050848438936429)),
									"priority": "500",
									"start": "Thu Sep 25 12:00:00 EDT 2003",
									"finish": "Thu Sep 25 12:00:00 EDT 2003",
									"duration": "0.0",
									"percentageComplete": "0.8050848438936429",
									"milestone": "true",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "15",
								"name": "Functional specifications completed per EPM Enterprise Implementation Framework",
								"data": 
								{
									"$area": 0.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4526458131213632)),
									"priority": "500",
									"start": "Thu Sep 25 12:00:00 EDT 2003",
									"finish": "Thu Sep 25 12:00:00 EDT 2003",
									"duration": "0.0",
									"percentageComplete": "0.4526458131213632",
									"milestone": "true",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "16",
								"name": "Build implementation team",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.13307236417893797)),
									"priority": "500",
									"start": "Thu Sep 25 13:00:00 EDT 2003",
									"finish": "Fri Sep 26 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.13307236417893797",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "17",
								"name": "Project success metrics defined",
								"data": 
								{
									"$area": 0.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.24369258236725622)),
									"priority": "500",
									"start": "Thu Sep 25 12:00:00 EDT 2003",
									"finish": "Thu Sep 25 12:00:00 EDT 2003",
									"duration": "0.0",
									"percentageComplete": "0.24369258236725622",
									"milestone": "true",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "18",
							"name": "Determine Functional Components to Install",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3745753731002279)),
								"priority": "500",
								"start": "Fri Sep 26 13:00:00 EDT 2003",
								"finish": "Mon Sep 29 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.3745753731002279",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "19",
								"name": "Decide between Microsoft SQL Server or the MSDE",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.10834536867903677)),
									"priority": "500",
									"start": "Fri Sep 26 13:00:00 EDT 2003",
									"finish": "Mon Sep 29 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.10834536867903677",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "20",
								"name": "Consider Microsoft SQL Server Analysis Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9710164205490401)),
									"priority": "500",
									"start": "Fri Sep 26 13:00:00 EDT 2003",
									"finish": "Mon Sep 29 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.9710164205490401",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "21",
								"name": "Consider Microsoft SharePoint Portal Server \"v2.0\"",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5294947471142776)),
									"priority": "500",
									"start": "Fri Sep 26 13:00:00 EDT 2003",
									"finish": "Mon Sep 29 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.5294947471142776",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "22",
								"name": "Consider Microsoft Windows SharePoint Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.47221849325626075)),
									"priority": "500",
									"start": "Fri Sep 26 13:00:00 EDT 2003",
									"finish": "Mon Sep 29 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.47221849325626075",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "23",
								"name": "Consider Microsoft Windows Terminal Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14593332511095036)),
									"priority": "500",
									"start": "Fri Sep 26 13:00:00 EDT 2003",
									"finish": "Mon Sep 29 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.14593332511095036",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "24",
							"name": "Identify Configuration Constraints",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4992258395864908)),
								"priority": "500",
								"start": "Mon Sep 29 13:00:00 EDT 2003",
								"finish": "Tue Sep 30 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.4992258395864908",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "25",
								"name": "Review feature requirements",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8585755484858598)),
									"priority": "500",
									"start": "Mon Sep 29 13:00:00 EDT 2003",
									"finish": "Tue Sep 30 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.8585755484858598",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "26",
								"name": "Review organizational software standards",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4663449980858665)),
									"priority": "500",
									"start": "Mon Sep 29 13:00:00 EDT 2003",
									"finish": "Tue Sep 30 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4663449980858665",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "27",
								"name": "Determine implementation constraints including architecture and deployment",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9042454554874947)),
									"priority": "500",
									"start": "Mon Sep 29 13:00:00 EDT 2003",
									"finish": "Mon Sep 29 17:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.9042454554874947",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "28",
							"name": "Plan software configuration complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7022112541695699)),
								"priority": "500",
								"start": "Tue Sep 30 12:00:00 EDT 2003",
								"finish": "Tue Sep 30 12:00:00 EDT 2003",
								"duration": "0.0",
								"percentageComplete": "0.7022112541695699",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "29",
						"name": "Perform Capacity Planning",
						"data": 
						{
							"$area": 3.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.47182843349068426)),
							"priority": "500",
							"start": "Tue Sep 30 13:00:00 EDT 2003",
							"finish": "Fri Oct 03 12:00:00 EDT 2003",
							"duration": "3.0",
							"percentageComplete": "0.47182843349068426",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "30",
							"name": "Identify roles of users",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14620059931911022)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.14620059931911022",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "31",
							"name": "Determine number of users in various role",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6702542062832119)),
								"priority": "500",
								"start": "Wed Oct 01 13:00:00 EDT 2003",
								"finish": "Thu Oct 02 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.6702542062832119",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "32",
								"name": "Document number of Project Managers",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.41614281626896654)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.41614281626896654",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "33",
								"name": "Document number of Team Members",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4112943262535771)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4112943262535771",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "34",
								"name": "Document number of Executives",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21780590192017235)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.21780590192017235",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "35",
								"name": "Document number of External Project Managers",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9826417822824993)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.9826417822824993",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "36",
							"name": "Determine usage patterns by role",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.29896353763841166)),
								"priority": "500",
								"start": "Wed Oct 01 13:00:00 EDT 2003",
								"finish": "Thu Oct 02 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.29896353763841166",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "37",
								"name": "Document usage patterns of Project Managers",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.269363209986469)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.269363209986469",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "38",
								"name": "Document usage patterns of Team Members",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.592120916455433)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.592120916455433",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "39",
								"name": "Document usage patterns of Executives",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2600639467150937)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.2600639467150937",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "40",
								"name": "Document usage patterns of External Project Managers",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.48196519533478377)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.48196519533478377",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "41",
							"name": "Document Server Capacity",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7052955470024366)),
								"priority": "500",
								"start": "Thu Oct 02 13:00:00 EDT 2003",
								"finish": "Fri Oct 03 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.7052955470024366",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "42",
								"name": "Determine Bandwidth Requirements",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.41320436294293394)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.41320436294293394",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "43",
									"name": "Bandwidth requirements for users",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.13095420938164348)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Fri Oct 03 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.13095420938164348",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "44",
									"name": "Bandwidth requirements for servers",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8150966911888666)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Fri Oct 03 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.8150966911888666",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "45",
								"name": "Determine Disk Space Requirements",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08339162990136917)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.08339162990136917",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "46",
									"name": "Disk space requirements for databases",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1863975482960677)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Fri Oct 03 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.1863975482960677",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "47",
									"name": "Disk space requirements for document storage",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7351582699819408)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Fri Oct 03 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.7351582699819408",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "48",
									"name": "Disk space requirements for indexes",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.530317605335679)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Fri Oct 03 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.530317605335679",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "49",
									"name": "Disk space requirements for redundancy",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8397370256023726)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Fri Oct 03 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.8397370256023726",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "50",
								"name": "Determine Server Requirements",
								"data": 
								{
									"$area": 0.5,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5279426135055257)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Thu Oct 02 17:00:00 EDT 2003",
									"duration": "0.5",
									"percentageComplete": "0.5279426135055257",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "51",
									"name": "Number of servers for application demands",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.44408900786618444)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.44408900786618444",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "52",
									"name": "Identify servers needed for testing environment",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7578187717633288)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.7578187717633288",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "53",
									"name": "Identify servers needed for training environment",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.102977859436032)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.102977859436032",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "54",
									"name": "Determine number of servers for redundancy",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7958482053784064)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.7958482053784064",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "55",
									"name": "Determine role of servers",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.24431260754796058)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.24431260754796058",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "56",
									"name": "Determine memory per server",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7211810631851366)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.7211810631851366",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "57",
									"name": "Determine processing power per server",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.06601029793920354)),
										"priority": "500",
										"start": "Thu Oct 02 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.06601029793920354",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							}
							]
						},
						{
							"id": "58",
							"name": "Inventory and Plan Desktop Configuration",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7443293386037169)),
								"priority": "500",
								"start": "Thu Oct 02 13:00:00 EDT 2003",
								"finish": "Fri Oct 03 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.7443293386037169",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "59",
								"name": "Inventory desktop hardware",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4547850570433476)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4547850570433476",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "60",
								"name": "Inventory desktop software",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21273946924800236)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.21273946924800236",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "61",
								"name": "Identify user profiles and customizations",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8633077766499682)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.8633077766499682",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "62",
								"name": "Identify files for distribution",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8048960369995777)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.8048960369995777",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "63",
								"name": "Identify multilingual requirements",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7659514810785172)),
									"priority": "500",
									"start": "Thu Oct 02 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.7659514810785172",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "64",
							"name": "Perform capacity planning complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7112788396865676)),
								"priority": "500",
								"start": "Fri Oct 03 12:00:00 EDT 2003",
								"finish": "Fri Oct 03 12:00:00 EDT 2003",
								"duration": "0.0",
								"percentageComplete": "0.7112788396865676",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "65",
						"name": "Evaluate Migration Requirements",
						"data": 
						{
							"$area": 3.5,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7746708670222723)),
							"priority": "500",
							"start": "Tue Sep 30 13:00:00 EDT 2003",
							"finish": "Fri Oct 03 17:00:00 EDT 2003",
							"duration": "3.5",
							"percentageComplete": "0.7746708670222723",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "66",
							"name": "Identify Coexistence Issues",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8194333792089253)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.8194333792089253",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "67",
								"name": "Identify coexistence issues with other enterprise applications",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9059150465242218)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.9059150465242218",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "68",
								"name": "Determine if earlier versions of Microsoft Project will coexist",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7813693315839545)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.7813693315839545",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "69",
								"name": "Determine strategy for managing coexistence issues",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4390640142985449)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Tue Sep 30 17:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.4390640142985449",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "70",
							"name": "Identify Migration Strategies",
							"data": 
							{
								"$area": 3.5,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8542603869216344)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Fri Oct 03 17:00:00 EDT 2003",
								"duration": "3.5",
								"percentageComplete": "0.8542603869216344",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "71",
								"name": "Identify projects for conversion/import",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4883164302963503)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4883164302963503",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "72",
								"name": "Identify strategy for projects not being imported/converted",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.22654868419580254)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.22654868419580254",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "73",
								"name": "Identify macros for migration",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5984030883530606)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Tue Sep 30 17:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.5984030883530606",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "74",
								"name": "Identify templates for migration",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5804362353702367)),
									"priority": "500",
									"start": "Wed Oct 01 08:00:00 EDT 2003",
									"finish": "Wed Oct 01 17:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.5804362353702367",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "75",
								"name": "Identify custom integrated applications for migration",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.25547554189966926)),
									"priority": "500",
									"start": "Thu Oct 02 08:00:00 EDT 2003",
									"finish": "Thu Oct 02 17:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.25547554189966926",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "76",
								"name": "Identify custom Project Guides for migration",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4112667744326255)),
									"priority": "500",
									"start": "Fri Oct 03 08:00:00 EDT 2003",
									"finish": "Fri Oct 03 17:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4112667744326255",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "77",
								"name": "Review database migration tool for upgrading from Microsoft Project Server 2002",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.108833940703569)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.108833940703569",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "78",
								"name": "Review migration tool for upgrading from Microsoft SharePoint Team Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12031319718483757)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.12031319718483757",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "79",
							"name": "Evaluate migration requirements complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3820310845058832)),
								"priority": "500",
								"start": "Fri Oct 03 17:00:00 EDT 2003",
								"finish": "Fri Oct 03 17:00:00 EDT 2003",
								"duration": "0.0",
								"percentageComplete": "0.3820310845058832",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "80",
						"name": "Plan Systems Integration",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6167962918705087)),
							"priority": "500",
							"start": "Tue Sep 30 13:00:00 EDT 2003",
							"finish": "Wed Oct 01 12:00:00 EDT 2003",
							"duration": "1.0",
							"percentageComplete": "0.6167962918705087",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "81",
							"name": "Identify Systems with Information Needed in EPM Environment",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7409686562933243)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.7409686562933243",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "82",
								"name": "Evaluate HR and resource pools",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4816663667286436)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4816663667286436",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "83",
								"name": "Evaluate cost tracking systems",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9798349210387421)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.9798349210387421",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "84",
								"name": "Evaluate other enterprise reporting systems",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14066425841884367)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.14066425841884367",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "85",
								"name": "Evaluate time and labor systems",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9088913434165649)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.9088913434165649",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "86",
								"name": "Evaluate other line of business systems",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4107453484874448)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4107453484874448",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "87",
							"name": "Plan systems integration complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7468745026708061)),
								"priority": "500",
								"start": "Wed Oct 01 12:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "0.0",
								"percentageComplete": "0.7468745026708061",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "88",
						"name": "Plan Infrastructure",
						"data": 
						{
							"$area": 4.5,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.887603718882128)),
							"priority": "500",
							"start": "Tue Sep 30 13:00:00 EDT 2003",
							"finish": "Mon Oct 06 17:00:00 EDT 2003",
							"duration": "4.5",
							"percentageComplete": "0.887603718882128",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "89",
							"name": "Evaluate and Upgrade Network",
							"data": 
							{
								"$area": 3.5,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5562798904374598)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Fri Oct 03 17:00:00 EDT 2003",
								"duration": "3.5",
								"percentageComplete": "0.5562798904374598",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "90",
								"name": "Identify Existing Connections",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4492485482668219)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4492485482668219",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "91",
									"name": "Diagram/Document LAN connections",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21955766067040472)),
										"priority": "500",
										"start": "Tue Sep 30 13:00:00 EDT 2003",
										"finish": "Wed Oct 01 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.21955766067040472",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "92",
									"name": "Diagram/Document WAN connections",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4738809798940119)),
										"priority": "500",
										"start": "Tue Sep 30 13:00:00 EDT 2003",
										"finish": "Wed Oct 01 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.4738809798940119",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "93",
									"name": "Evaluate external user connections",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9406851096691418)),
										"priority": "500",
										"start": "Tue Sep 30 13:00:00 EDT 2003",
										"finish": "Wed Oct 01 12:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.9406851096691418",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "94",
								"name": "Handle Upgrades",
								"data": 
								{
									"$area": 2.5,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15096026951737318)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Fri Oct 03 17:00:00 EDT 2003",
									"duration": "2.5",
									"percentageComplete": "0.15096026951737318",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "95",
									"name": "Increase bandwidth as needed",
									"data": 
									{
										"$area": 12.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5699976106117625)),
										"priority": "500",
										"start": "Wed Oct 01 13:00:00 EDT 2003",
										"finish": "Thu Oct 02 17:00:00 EDT 2003",
										"duration": "12.0",
										"percentageComplete": "0.5699976106117625",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "96",
									"name": "Configure a VPN solution as needed",
									"data": 
									{
										"$area": 20.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6625993689923098)),
										"priority": "500",
										"start": "Wed Oct 01 13:00:00 EDT 2003",
										"finish": "Fri Oct 03 17:00:00 EDT 2003",
										"duration": "20.0",
										"percentageComplete": "0.6625993689923098",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							}
							]
						},
						{
							"id": "97",
							"name": "Evaluate and Upgrade Hardware",
							"data": 
							{
								"$area": 1.5,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1272588843798793)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 17:00:00 EDT 2003",
								"duration": "1.5",
								"percentageComplete": "0.1272588843798793",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "98",
								"name": "Identify hardware for each project service",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.011169500594568782)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Tue Sep 30 17:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.011169500594568782",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "99",
								"name": "Identify hardware vendor",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8921297982616704)),
									"priority": "500",
									"start": "Wed Oct 01 08:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.8921297982616704",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "100",
								"name": "Order hardware",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07625613931937858)),
									"priority": "500",
									"start": "Wed Oct 01 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 17:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.07625613931937858",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "101",
							"name": "Evaluate Software",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.841837189513497)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.841837189513497",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "102",
								"name": "Evaluate Microsoft Windows 2000 Server/Microsoft Windows Server 2003",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3459476753194257)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.3459476753194257",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "103",
								"name": "Evaluate Microsoft Internet Information Server",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8012313545121291)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.8012313545121291",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "104",
								"name": "Evaluate Microsoft SQL Server",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2543253303576377)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.2543253303576377",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "105",
								"name": "Evaluate Microsoft SQL Analysis Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7452980653451586)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.7452980653451586",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "106",
								"name": "Evaluate Microsoft Windows SharePoint Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8570326246681979)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.8570326246681979",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "107",
								"name": "Evaluate Microsoft SharePoint Portal Server \"v2.0\"",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4826176832137057)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4826176832137057",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "108",
							"name": "Document Infrastructure",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19181939570551998)),
								"priority": "500",
								"start": "Mon Oct 06 08:00:00 EDT 2003",
								"finish": "Mon Oct 06 17:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.19181939570551998",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "109",
								"name": "Create physical implementation diagram.  Include: SQL Server, Analysis Services, Microsoft Office Project Server 2003, Windows SharePoint Services, Microsoft SharePoint Portal Server \"v2.0\", Views Notification Services, and Session State Server",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.016897231316997274)),
									"priority": "500",
									"start": "Mon Oct 06 08:00:00 EDT 2003",
									"finish": "Mon Oct 06 17:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.016897231316997274",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "110",
								"name": "Create Model Configuration Definitions",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2716448633229277)),
									"priority": "500",
									"start": "Mon Oct 06 08:00:00 EDT 2003",
									"finish": "Mon Oct 06 17:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.2716448633229277",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "111",
									"name": "Create Microsoft Internet Explorer definition",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.30411931754498134)),
										"priority": "500",
										"start": "Mon Oct 06 08:00:00 EDT 2003",
										"finish": "Mon Oct 06 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.30411931754498134",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "112",
									"name": "Create Project Server 2003 definition",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7782515157558018)),
										"priority": "500",
										"start": "Mon Oct 06 08:00:00 EDT 2003",
										"finish": "Mon Oct 06 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.7782515157558018",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "113",
									"name": "Create SQL Server definition",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.41015991207600555)),
										"priority": "500",
										"start": "Mon Oct 06 08:00:00 EDT 2003",
										"finish": "Mon Oct 06 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.41015991207600555",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "114",
									"name": "Create SQL Server Analysis Services definition",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14594060122181363)),
										"priority": "500",
										"start": "Mon Oct 06 08:00:00 EDT 2003",
										"finish": "Mon Oct 06 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.14594060122181363",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "115",
									"name": "Create IIS definition",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.17873176357114784)),
										"priority": "500",
										"start": "Mon Oct 06 08:00:00 EDT 2003",
										"finish": "Mon Oct 06 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.17873176357114784",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "116",
									"name": "Create Windows SharePoint Services definition",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.48629787122746326)),
										"priority": "500",
										"start": "Mon Oct 06 08:00:00 EDT 2003",
										"finish": "Mon Oct 06 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.48629787122746326",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "117",
									"name": "Create Microsoft SharePoint Portal Server \"v2.0\" definition",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.147826564296486)),
										"priority": "500",
										"start": "Mon Oct 06 08:00:00 EDT 2003",
										"finish": "Mon Oct 06 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.147826564296486",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							}
							]
						},
						{
							"id": "118",
							"name": "Plan infrastructure complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5589159283173166)),
								"priority": "500",
								"start": "Mon Oct 06 17:00:00 EDT 2003",
								"finish": "Mon Oct 06 17:00:00 EDT 2003",
								"duration": "0.0",
								"percentageComplete": "0.5589159283173166",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "119",
						"name": "Define Security",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.990501242568716)),
							"priority": "500",
							"start": "Tue Sep 30 13:00:00 EDT 2003",
							"finish": "Wed Oct 01 12:00:00 EDT 2003",
							"duration": "1.0",
							"percentageComplete": "0.990501242568716",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "120",
							"name": "Consider use of SSL to access SharePoint technologies and Project Server",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08818553426787845)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.08818553426787845",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "121",
							"name": "Define and Document Network Service Accounts",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.24755263689021234)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.24755263689021234",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "122",
								"name": "Set up SQL Server service account",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3061100274291938)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.3061100274291938",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "123",
								"name": "Set up Project Server COM+ package accounts",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.398525478450632)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.398525478450632",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "124",
								"name": "Configure Windows SharePoint Services service accounts",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.39105378489790155)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.39105378489790155",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "125",
								"name": "Configure Microsoft SharePoint Portal Server \"v2.0\" service accounts",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4588184353173268)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.4588184353173268",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "126",
							"name": "Define Project Server Security Scheme",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4983452760726893)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.4983452760726893",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "127",
								"name": "Document groups",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9423840099478547)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.9423840099478547",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "128",
								"name": "Document categories",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3085426805256687)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.3085426805256687",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "129",
								"name": "Document security templates",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.28997448312798213)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.28997448312798213",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "130",
								"name": "Determine group membership",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.49927764817784825)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.49927764817784825",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "131",
								"name": "Determine authentication method",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.48991020477604286)),
									"priority": "500",
									"start": "Tue Sep 30 13:00:00 EDT 2003",
									"finish": "Wed Oct 01 12:00:00 EDT 2003",
									"duration": "1.0",
									"percentageComplete": "0.48991020477604286",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "132",
							"name": "Define security complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9581773162998074)),
								"priority": "500",
								"start": "Wed Oct 01 12:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "0.0",
								"percentageComplete": "0.9581773162998074",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "133",
						"name": "Define Internationalization Requirements",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2370102794618929)),
							"priority": "500",
							"start": "Tue Sep 30 13:00:00 EDT 2003",
							"finish": "Wed Oct 01 12:00:00 EDT 2003",
							"duration": "1.0",
							"percentageComplete": "0.2370102794618929",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "134",
							"name": "Review currency requirements",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.03173029934666005)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.03173029934666005",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "135",
							"name": "Review language requirements",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2725040261876104)),
								"priority": "500",
								"start": "Tue Sep 30 13:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "1.0",
								"percentageComplete": "0.2725040261876104",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "136",
							"name": "Define internationalization requirements complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9448183004508112)),
								"priority": "500",
								"start": "Wed Oct 01 12:00:00 EDT 2003",
								"finish": "Wed Oct 01 12:00:00 EDT 2003",
								"duration": "0.0",
								"percentageComplete": "0.9448183004508112",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "137",
						"name": "Planning complete",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.06585626077577966)),
							"priority": "500",
							"start": "Mon Oct 06 17:00:00 EDT 2003",
							"finish": "Mon Oct 06 17:00:00 EDT 2003",
							"duration": "0.0",
							"percentageComplete": "0.06585626077577966",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					}
					]
				},
				{
					"id": "138",
					"name": "Deployment",
					"data": 
					{
						"$area": 79.75,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7036792179069996)),
						"priority": "500",
						"start": "Tue Oct 07 08:00:00 EDT 2003",
						"finish": "Mon Jan 26 15:00:00 EST 2004",
						"duration": "79.75",
						"percentageComplete": "0.7036792179069996",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "139",
						"name": "Deploy Pilot",
						"data": 
						{
							"$area": 20.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.38893402012909895)),
							"priority": "500",
							"start": "Tue Oct 07 08:00:00 EDT 2003",
							"finish": "Mon Nov 03 17:00:00 EST 2003",
							"duration": "20.0",
							"percentageComplete": "0.38893402012909895",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "140",
							"name": "Install Servers",
							"data": 
							{
								"$area": 17.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4234087514848348)),
								"priority": "500",
								"start": "Tue Oct 07 08:00:00 EDT 2003",
								"finish": "Wed Oct 29 17:00:00 EST 2003",
								"duration": "17.0",
								"percentageComplete": "0.4234087514848348",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "141",
								"name": "Install hardware",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2674904493187492)),
									"priority": "500",
									"start": "Tue Oct 07 08:00:00 EDT 2003",
									"finish": "Fri Oct 10 17:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.2674904493187492",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "142",
								"name": "Install Software",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3117348475315125)),
									"priority": "500",
									"start": "Mon Oct 13 08:00:00 EDT 2003",
									"finish": "Thu Oct 16 17:00:00 EDT 2003",
									"duration": "4.0",
									"percentageComplete": "0.3117348475315125",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "143",
									"name": "Install operating system(s)",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9169852079991537)),
										"priority": "500",
										"start": "Mon Oct 13 08:00:00 EDT 2003",
										"finish": "Thu Oct 16 17:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.9169852079991537",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "144",
									"name": "Install appropriate operating system patches",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7951186595722941)),
										"priority": "500",
										"start": "Mon Oct 13 08:00:00 EDT 2003",
										"finish": "Mon Oct 13 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.7951186595722941",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "145",
									"name": "Install and configure SQL Server",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8716404814753728)),
										"priority": "500",
										"start": "Mon Oct 13 08:00:00 EDT 2003",
										"finish": "Mon Oct 13 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.8716404814753728",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "146",
										"name": "Install SQL Server",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12499727216704293)),
											"priority": "500",
											"start": "Mon Oct 13 08:00:00 EDT 2003",
											"finish": "Mon Oct 13 12:00:00 EDT 2003",
											"duration": "4.0",
											"percentageComplete": "0.12499727216704293",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "147",
										"name": "Create Project Server database(s) (run data definition scripts or use installation tool)",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.16125553266115789)),
											"priority": "500",
											"start": "Mon Oct 13 13:00:00 EDT 2003",
											"finish": "Mon Oct 13 15:00:00 EDT 2003",
											"duration": "2.0",
											"percentageComplete": "0.16125553266115789",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "148",
										"name": "Create additional Project Server databases for additional Project Server instances",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.49783553713333784)),
											"priority": "500",
											"start": "Mon Oct 13 15:00:00 EDT 2003",
											"finish": "Mon Oct 13 17:00:00 EDT 2003",
											"duration": "2.0",
											"percentageComplete": "0.49783553713333784",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "149",
										"name": "Create Project Server service user accounts",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7913104804283417)),
											"priority": "500",
											"start": "Mon Oct 13 08:00:00 EDT 2003",
											"finish": "Mon Oct 13 10:00:00 EDT 2003",
											"duration": "2.0",
											"percentageComplete": "0.7913104804283417",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "150",
										"name": "Install SQL Server Analysis Services",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08318201526958702)),
											"priority": "500",
											"start": "Mon Oct 13 08:00:00 EDT 2003",
											"finish": "Mon Oct 13 12:00:00 EDT 2003",
											"duration": "4.0",
											"percentageComplete": "0.08318201526958702",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									}
									]
								},
								{
									"id": "151",
									"name": "Install Windows SharePoint Services",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.358595680572109)),
										"priority": "500",
										"start": "Mon Oct 13 08:00:00 EDT 2003",
										"finish": "Mon Oct 13 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.358595680572109",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "152",
									"name": "Install Microsoft SharePoint Portal Server \"v2.0\"",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.20343378829909975)),
										"priority": "500",
										"start": "Mon Oct 13 08:00:00 EDT 2003",
										"finish": "Mon Oct 13 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.20343378829909975",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "153",
									"name": "Install Project Server(s)",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07271059662207113)),
										"priority": "500",
										"start": "Tue Oct 14 08:00:00 EDT 2003",
										"finish": "Tue Oct 14 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.07271059662207113",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "154",
										"name": "Install application server(s)",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7011896595954085)),
											"priority": "500",
											"start": "Tue Oct 14 08:00:00 EDT 2003",
											"finish": "Tue Oct 14 17:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.7011896595954085",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "155",
										"name": "Install Project Server (or Project Server cluster)",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5317714700619538)),
											"priority": "500",
											"start": "Tue Oct 14 08:00:00 EDT 2003",
											"finish": "Tue Oct 14 17:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.5317714700619538",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									}
									]
								},
								{
									"id": "156",
									"name": "Install Terminal Services",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.425785420863259)),
										"priority": "500",
										"start": "Mon Oct 13 08:00:00 EDT 2003",
										"finish": "Mon Oct 13 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.425785420863259",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "157",
									"name": "Install appropriate application patches",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.09141268211758491)),
										"priority": "500",
										"start": "Mon Oct 13 08:00:00 EDT 2003",
										"finish": "Mon Oct 13 17:00:00 EDT 2003",
										"duration": "1.0",
										"percentageComplete": "0.09141268211758491",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "158",
								"name": "Configure Software",
								"data": 
								{
									"$area": 7.5,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.36792405886421564)),
									"priority": "500",
									"start": "Fri Oct 17 08:00:00 EDT 2003",
									"finish": "Tue Oct 28 12:00:00 EST 2003",
									"duration": "7.5",
									"percentageComplete": "0.36792405886421564",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "159",
									"name": "Configure Project Server",
									"data": 
									{
										"$area": 7.5,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.43619635785814004)),
										"priority": "500",
										"start": "Fri Oct 17 08:00:00 EDT 2003",
										"finish": "Tue Oct 28 12:00:00 EST 2003",
										"duration": "7.5",
										"percentageComplete": "0.43619635785814004",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "160",
										"name": "Configure Microsoft Project Server subwebs",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.536379635466194)),
											"priority": "500",
											"start": "Fri Oct 17 08:00:00 EDT 2003",
											"finish": "Fri Oct 17 10:00:00 EDT 2003",
											"duration": "2.0",
											"percentageComplete": "0.536379635466194",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "161",
										"name": "Implement EPM Enterprise Implementation Framework outputs in enterprise global template",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.46125313206997576)),
											"priority": "500",
											"start": "Fri Oct 17 10:00:00 EDT 2003",
											"finish": "Tue Oct 21 10:00:00 EDT 2003",
											"duration": "2.0",
											"percentageComplete": "0.46125313206997576",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "162",
										"name": "Map resources and users to Windows user accounts",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9947115165325929)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Wed Oct 22 10:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.9947115165325929",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "163",
										"name": "Implement resources in enterprise resource pool",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.30945609341281344)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Wed Oct 22 10:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.30945609341281344",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "164",
										"name": "Implement security schema in Project Server",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.023021044691060144)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Tue Oct 21 15:00:00 EDT 2003",
											"duration": "4.0",
											"percentageComplete": "0.023021044691060144",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "165",
										"name": "Implement Project Center views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6767290404689972)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Wed Oct 22 10:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.6767290404689972",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "166",
										"name": "Implement Project views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7739423786558671)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Wed Oct 22 10:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.7739423786558671",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "167",
										"name": "Implement Resource Center views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.06877580834851604)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Wed Oct 22 10:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.06877580834851604",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "168",
										"name": "Implement Assignment views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.47663133378941214)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Wed Oct 22 10:00:00 EDT 2003",
											"duration": "1.0",
											"percentageComplete": "0.47663133378941214",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "169",
										"name": "Implement Portfolio Analyzer views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3074712430370441)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Tue Oct 21 15:00:00 EDT 2003",
											"duration": "4.0",
											"percentageComplete": "0.3074712430370441",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "170",
										"name": "Create models in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2330748748523519)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Tue Oct 21 15:00:00 EDT 2003",
											"duration": "4.0",
											"percentageComplete": "0.2330748748523519",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "171",
										"name": "Obtain and configure SMTP server information",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2650425456118426)),
											"priority": "500",
											"start": "Fri Oct 17 10:00:00 EDT 2003",
											"finish": "Fri Oct 17 12:00:00 EDT 2003",
											"duration": "2.0",
											"percentageComplete": "0.2650425456118426",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "172",
										"name": "Implement notifications and reminders in Project Server",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.00428509752733075)),
											"priority": "500",
											"start": "Tue Oct 21 10:00:00 EDT 2003",
											"finish": "Tue Oct 21 12:00:00 EDT 2003",
											"duration": "2.0",
											"percentageComplete": "0.00428509752733075",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "173",
										"name": "Execute Migration Plan",
										"data": 
										{
											"$area": 5.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19091741272837093)),
											"priority": "500",
											"start": "Tue Oct 21 13:00:00 EDT 2003",
											"finish": "Tue Oct 28 12:00:00 EST 2003",
											"duration": "5.0",
											"percentageComplete": "0.19091741272837093",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										{
											"id": "174",
											"name": "Migrate resources",
											"data": 
											{
												"$area": 2.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1469790939289327)),
												"priority": "500",
												"start": "Tue Oct 21 13:00:00 EDT 2003",
												"finish": "Thu Oct 23 12:00:00 EDT 2003",
												"duration": "2.0",
												"percentageComplete": "0.1469790939289327",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "175",
											"name": "Migrate project plans",
											"data": 
											{
												"$area": 2.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12435784295507524)),
												"priority": "500",
												"start": "Tue Oct 21 13:00:00 EDT 2003",
												"finish": "Thu Oct 23 12:00:00 EDT 2003",
												"duration": "2.0",
												"percentageComplete": "0.12435784295507524",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "176",
											"name": "Migrate templates",
											"data": 
											{
												"$area": 1.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.739135661680508)),
												"priority": "500",
												"start": "Tue Oct 21 13:00:00 EDT 2003",
												"finish": "Wed Oct 22 12:00:00 EDT 2003",
												"duration": "1.0",
												"percentageComplete": "0.739135661680508",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "177",
											"name": "Migrate databases",
											"data": 
											{
												"$area": 2.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3866969554691133)),
												"priority": "500",
												"start": "Tue Oct 21 13:00:00 EDT 2003",
												"finish": "Thu Oct 23 12:00:00 EDT 2003",
												"duration": "2.0",
												"percentageComplete": "0.3866969554691133",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "178",
											"name": "Migrate macros",
											"data": 
											{
												"$area": 5.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5453373833276658)),
												"priority": "500",
												"start": "Tue Oct 21 13:00:00 EDT 2003",
												"finish": "Tue Oct 28 12:00:00 EST 2003",
												"duration": "5.0",
												"percentageComplete": "0.5453373833276658",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "179",
											"name": "Migrate custom Project Guides",
											"data": 
											{
												"$area": 5.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9830619817371193)),
												"priority": "500",
												"start": "Tue Oct 21 13:00:00 EDT 2003",
												"finish": "Tue Oct 28 12:00:00 EST 2003",
												"duration": "5.0",
												"percentageComplete": "0.9830619817371193",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										}
										]
									}
									]
								}
								]
							},
							{
								"id": "180",
								"name": "Configure Microsoft SharePoint Portal Server \"v2.0\"",
								"data": 
								{
									"$area": 0.5,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3246215795793479)),
									"priority": "500",
									"start": "Tue Oct 28 13:00:00 EST 2003",
									"finish": "Tue Oct 28 17:00:00 EST 2003",
									"duration": "0.5",
									"percentageComplete": "0.3246215795793479",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "181",
									"name": "Set up Microsoft SharePoint Portal Server \"v2.0\" connection in Microsoft Office Project Web Access 2003",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4115311924996157)),
										"priority": "500",
										"start": "Tue Oct 28 13:00:00 EST 2003",
										"finish": "Tue Oct 28 17:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.4115311924996157",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "182",
									"name": "Configure Microsoft SharePoint Portal Server \"v2.0\" indexing",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8956270753851175)),
										"priority": "500",
										"start": "Tue Oct 28 13:00:00 EST 2003",
										"finish": "Tue Oct 28 17:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.8956270753851175",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "183",
									"name": "Connect existing team sites to the portal",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5159695214149237)),
										"priority": "500",
										"start": "Tue Oct 28 13:00:00 EST 2003",
										"finish": "Tue Oct 28 17:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.5159695214149237",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "184",
								"name": "Configure Windows SharePoint Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3457271347847264)),
									"priority": "500",
									"start": "Wed Oct 29 08:00:00 EST 2003",
									"finish": "Wed Oct 29 17:00:00 EST 2003",
									"duration": "1.0",
									"percentageComplete": "0.3457271347847264",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "185",
									"name": "Validate PSCOMPlus settings",
									"data": 
									{
										"$area": 2.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.38755322020601446)),
										"priority": "500",
										"start": "Wed Oct 29 08:00:00 EST 2003",
										"finish": "Wed Oct 29 10:00:00 EST 2003",
										"duration": "2.0",
										"percentageComplete": "0.38755322020601446",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "186",
									"name": "Configure proxy server",
									"data": 
									{
										"$area": 2.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12876319527148616)),
										"priority": "500",
										"start": "Wed Oct 29 08:00:00 EST 2003",
										"finish": "Wed Oct 29 10:00:00 EST 2003",
										"duration": "2.0",
										"percentageComplete": "0.12876319527148616",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "187",
									"name": "Configure SharePoint connection settings and site creation settings",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12127722899051874)),
										"priority": "500",
										"start": "Wed Oct 29 08:00:00 EST 2003",
										"finish": "Wed Oct 29 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.12127722899051874",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "188",
									"name": "Configure Windows SharePoint Services site templates",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5278020366970543)),
										"priority": "500",
										"start": "Wed Oct 29 08:00:00 EST 2003",
										"finish": "Wed Oct 29 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.5278020366970543",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "189",
									"name": "Configure cross-web security",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8365148553058672)),
										"priority": "500",
										"start": "Wed Oct 29 08:00:00 EST 2003",
										"finish": "Wed Oct 29 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.8365148553058672",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "190",
								"name": "Configure Analysis Services",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6265403969232793)),
									"priority": "500",
									"start": "Tue Oct 28 13:00:00 EST 2003",
									"finish": "Wed Oct 29 12:00:00 EST 2003",
									"duration": "1.0",
									"percentageComplete": "0.6265403969232793",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "191",
									"name": "Assign cube roles and permissions",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3194977285129338)),
										"priority": "500",
										"start": "Tue Oct 28 13:00:00 EST 2003",
										"finish": "Wed Oct 29 12:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.3194977285129338",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "192",
									"name": "Validate PSCOMPlus OLAP identity",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2339682079406067)),
										"priority": "500",
										"start": "Tue Oct 28 13:00:00 EST 2003",
										"finish": "Wed Oct 29 12:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.2339682079406067",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							}
							]
						},
						{
							"id": "193",
							"name": "Perform Desktop Deployment",
							"data": 
							{
								"$area": 5.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14670030357466435)),
								"priority": "500",
								"start": "Tue Oct 07 08:00:00 EDT 2003",
								"finish": "Mon Oct 13 17:00:00 EDT 2003",
								"duration": "5.0",
								"percentageComplete": "0.14670030357466435",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "194",
								"name": "Perform Scripted Deployment",
								"data": 
								{
									"$area": 2.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08287227487257454)),
									"priority": "500",
									"start": "Tue Oct 07 08:00:00 EDT 2003",
									"finish": "Wed Oct 08 17:00:00 EDT 2003",
									"duration": "2.0",
									"percentageComplete": "0.08287227487257454",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "195",
									"name": "Create deployment script",
									"data": 
									{
										"$area": 2.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5887342445599908)),
										"priority": "500",
										"start": "Tue Oct 07 08:00:00 EDT 2003",
										"finish": "Wed Oct 08 17:00:00 EDT 2003",
										"duration": "2.0",
										"percentageComplete": "0.5887342445599908",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "196",
									"name": "Schedule running of deployment script",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3112719256443729)),
										"priority": "500",
										"start": "Tue Oct 07 08:00:00 EDT 2003",
										"finish": "Tue Oct 07 12:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.3112719256443729",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "197",
								"name": "Deploy Terminal Services Client",
								"data": 
								{
									"$area": 20.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.09735043282066036)),
									"priority": "500",
									"start": "Tue Oct 07 08:00:00 EDT 2003",
									"finish": "Thu Oct 09 12:00:00 EDT 2003",
									"duration": "20.0",
									"percentageComplete": "0.09735043282066036",
									"milestone": "false",
									"notes": "Using Terminal Services Client will improve performance if you have project managers connecting to your Project Server over a WAN.\n"
								},
								"children": 
								[
								]
							},
							{
								"id": "198",
								"name": "Perform Manual Deployment",
								"data": 
								{
									"$area": 3.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4690826254834033)),
									"priority": "500",
									"start": "Tue Oct 07 08:00:00 EDT 2003",
									"finish": "Thu Oct 09 17:00:00 EDT 2003",
									"duration": "3.0",
									"percentageComplete": "0.4690826254834033",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "199",
									"name": "Develop specifications and documentation for running Setup",
									"data": 
									{
										"$area": 3.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18308452571789524)),
										"priority": "500",
										"start": "Tue Oct 07 08:00:00 EDT 2003",
										"finish": "Thu Oct 09 17:00:00 EDT 2003",
										"duration": "3.0",
										"percentageComplete": "0.18308452571789524",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "200",
									"name": "Provide location to run Setup",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4025334327907516)),
										"priority": "500",
										"start": "Tue Oct 07 08:00:00 EDT 2003",
										"finish": "Tue Oct 07 12:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.4025334327907516",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "201",
								"name": "Configure Internet Explorer",
								"data": 
								{
									"$area": 0.5,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7172124049234828)),
									"priority": "500",
									"start": "Tue Oct 07 08:00:00 EDT 2003",
									"finish": "Tue Oct 07 12:00:00 EDT 2003",
									"duration": "0.5",
									"percentageComplete": "0.7172124049234828",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "202",
									"name": "Configure trusted sites",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.005365723338994877)),
										"priority": "500",
										"start": "Tue Oct 07 08:00:00 EDT 2003",
										"finish": "Tue Oct 07 12:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.005365723338994877",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "203",
									"name": "Configure automatic download of ActiveX in trusted sites zone",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4019989868052234)),
										"priority": "500",
										"start": "Tue Oct 07 08:00:00 EDT 2003",
										"finish": "Tue Oct 07 12:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.4019989868052234",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "204",
									"name": "Allow cookies",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3726235644886229)),
										"priority": "500",
										"start": "Tue Oct 07 08:00:00 EDT 2003",
										"finish": "Tue Oct 07 12:00:00 EDT 2003",
										"duration": "4.0",
										"percentageComplete": "0.3726235644886229",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "205",
								"name": "Install the Microsoft Office System on desktop as desired/needed",
								"data": 
								{
									"$area": 5.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.28226607260917247)),
									"priority": "500",
									"start": "Tue Oct 07 08:00:00 EDT 2003",
									"finish": "Mon Oct 13 17:00:00 EDT 2003",
									"duration": "5.0",
									"percentageComplete": "0.28226607260917247",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "206",
							"name": "Implement pilot versions of planned system integrations",
							"data": 
							{
								"$area": 10.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5738333651904008)),
								"priority": "500",
								"start": "Tue Oct 14 08:00:00 EDT 2003",
								"finish": "Mon Oct 27 17:00:00 EST 2003",
								"duration": "10.0",
								"percentageComplete": "0.5738333651904008",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "207",
							"name": "Test the Pilot Deployment",
							"data": 
							{
								"$area": 5.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.050897949815117305)),
								"priority": "500",
								"start": "Tue Oct 28 08:00:00 EST 2003",
								"finish": "Mon Nov 03 17:00:00 EST 2003",
								"duration": "5.0",
								"percentageComplete": "0.050897949815117305",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "208",
								"name": "Test system function",
								"data": 
								{
									"$area": 3.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7448558929459015)),
									"priority": "500",
									"start": "Tue Oct 28 08:00:00 EST 2003",
									"finish": "Thu Oct 30 17:00:00 EST 2003",
									"duration": "3.0",
									"percentageComplete": "0.7448558929459015",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "209",
								"name": "Resolve issues",
								"data": 
								{
									"$area": 5.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.23914033603910456)),
									"priority": "500",
									"start": "Tue Oct 28 08:00:00 EST 2003",
									"finish": "Mon Nov 03 17:00:00 EST 2003",
									"duration": "5.0",
									"percentageComplete": "0.23914033603910456",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "210",
									"name": "Resolve connectivity problems",
									"data": 
									{
										"$area": 5.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5907391726033551)),
										"priority": "500",
										"start": "Tue Oct 28 08:00:00 EST 2003",
										"finish": "Mon Nov 03 17:00:00 EST 2003",
										"duration": "5.0",
										"percentageComplete": "0.5907391726033551",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "211",
									"name": "Resolve installation problems",
									"data": 
									{
										"$area": 5.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4049622607368075)),
										"priority": "500",
										"start": "Tue Oct 28 08:00:00 EST 2003",
										"finish": "Mon Nov 03 17:00:00 EST 2003",
										"duration": "5.0",
										"percentageComplete": "0.4049622607368075",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "212",
								"name": "Scrub test data",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6257171644488531)),
									"priority": "500",
									"start": "Tue Oct 28 08:00:00 EST 2003",
									"finish": "Tue Oct 28 17:00:00 EST 2003",
									"duration": "1.0",
									"percentageComplete": "0.6257171644488531",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "213",
							"name": "Deploy pilot complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8754405270047318)),
								"priority": "500",
								"start": "Mon Nov 03 17:00:00 EST 2003",
								"finish": "Mon Nov 03 17:00:00 EST 2003",
								"duration": "0.0",
								"percentageComplete": "0.8754405270047318",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "214",
						"name": "Compare pilot results to success criteria",
						"data": 
						{
							"$area": 5.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7096904115505791)),
							"priority": "500",
							"start": "Tue Nov 04 08:00:00 EST 2003",
							"finish": "Mon Nov 10 17:00:00 EST 2003",
							"duration": "5.0",
							"percentageComplete": "0.7096904115505791",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "215",
						"name": "Production deployment approved",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8669352319845314)),
							"priority": "500",
							"start": "Mon Nov 10 17:00:00 EST 2003",
							"finish": "Mon Nov 10 17:00:00 EST 2003",
							"duration": "0.0",
							"percentageComplete": "0.8669352319845314",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "216",
						"name": "Deploy Production System",
						"data": 
						{
							"$area": 50.75,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9665374500742497)),
							"priority": "500",
							"start": "Tue Nov 11 08:00:00 EST 2003",
							"finish": "Tue Jan 20 15:00:00 EST 2004",
							"duration": "50.75",
							"percentageComplete": "0.9665374500742497",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "217",
							"name": "Install Servers",
							"data": 
							{
								"$area": 14.75,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5587239641313916)),
								"priority": "500",
								"start": "Tue Nov 11 08:00:00 EST 2003",
								"finish": "Mon Dec 01 15:00:00 EST 2003",
								"duration": "14.75",
								"percentageComplete": "0.5587239641313916",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "218",
								"name": "Install hardware",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8512712545967976)),
									"priority": "500",
									"start": "Tue Nov 11 08:00:00 EST 2003",
									"finish": "Fri Nov 14 17:00:00 EST 2003",
									"duration": "4.0",
									"percentageComplete": "0.8512712545967976",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "219",
								"name": "Install Software",
								"data": 
								{
									"$area": 4.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.753874547558201)),
									"priority": "500",
									"start": "Mon Nov 17 08:00:00 EST 2003",
									"finish": "Thu Nov 20 17:00:00 EST 2003",
									"duration": "4.0",
									"percentageComplete": "0.753874547558201",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "220",
									"name": "Install operating system(s)",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.10319230041330041)),
										"priority": "500",
										"start": "Mon Nov 17 08:00:00 EST 2003",
										"finish": "Thu Nov 20 17:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.10319230041330041",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "221",
									"name": "Install appropriate operating system patches",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7310275966342394)),
										"priority": "500",
										"start": "Mon Nov 17 08:00:00 EST 2003",
										"finish": "Mon Nov 17 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.7310275966342394",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "222",
									"name": "Install and Configure SQL Server",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19982468893168182)),
										"priority": "500",
										"start": "Mon Nov 17 08:00:00 EST 2003",
										"finish": "Mon Nov 17 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.19982468893168182",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "223",
										"name": "Install SQL Server",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.25854518951865746)),
											"priority": "500",
											"start": "Mon Nov 17 08:00:00 EST 2003",
											"finish": "Mon Nov 17 12:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.25854518951865746",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "224",
										"name": "Create Project Server database(s) (run data definition scripts or use installation tool)",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7563369238032212)),
											"priority": "500",
											"start": "Mon Nov 17 13:00:00 EST 2003",
											"finish": "Mon Nov 17 15:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.7563369238032212",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "225",
										"name": "Create additional Project Server databases for additional Project Server instances",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.643820347638014)),
											"priority": "500",
											"start": "Mon Nov 17 15:00:00 EST 2003",
											"finish": "Mon Nov 17 17:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.643820347638014",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "226",
										"name": "Create Project Server service user accounts",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7537494510210213)),
											"priority": "500",
											"start": "Mon Nov 17 08:00:00 EST 2003",
											"finish": "Mon Nov 17 10:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.7537494510210213",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "227",
										"name": "Install SQL Server Analysis Services",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.29846869543453913)),
											"priority": "500",
											"start": "Mon Nov 17 08:00:00 EST 2003",
											"finish": "Mon Nov 17 12:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.29846869543453913",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									}
									]
								},
								{
									"id": "228",
									"name": "Install Windows SharePoint Services",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8675274368532777)),
										"priority": "500",
										"start": "Mon Nov 17 08:00:00 EST 2003",
										"finish": "Mon Nov 17 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.8675274368532777",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "229",
									"name": "Install Microsoft SharePoint Portal Server \"v2.0\"",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.850950297247833)),
										"priority": "500",
										"start": "Mon Nov 17 08:00:00 EST 2003",
										"finish": "Mon Nov 17 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.850950297247833",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "230",
									"name": "Install Project Server(s)",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3337620187575363)),
										"priority": "500",
										"start": "Tue Nov 18 08:00:00 EST 2003",
										"finish": "Tue Nov 18 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.3337620187575363",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "231",
										"name": "Install application server(s)",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.11376795742768375)),
											"priority": "500",
											"start": "Tue Nov 18 08:00:00 EST 2003",
											"finish": "Tue Nov 18 17:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.11376795742768375",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "232",
										"name": "Install Project Server (or Project Server cluster)",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9050755662834643)),
											"priority": "500",
											"start": "Tue Nov 18 08:00:00 EST 2003",
											"finish": "Tue Nov 18 17:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.9050755662834643",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									}
									]
								},
								{
									"id": "233",
									"name": "Install Terminal Services",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5508440817899277)),
										"priority": "500",
										"start": "Mon Nov 17 08:00:00 EST 2003",
										"finish": "Mon Nov 17 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.5508440817899277",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "234",
									"name": "Install appropriate application patches",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8965307783727723)),
										"priority": "500",
										"start": "Mon Nov 17 08:00:00 EST 2003",
										"finish": "Mon Nov 17 17:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.8965307783727723",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "235",
								"name": "Configure Software",
								"data": 
								{
									"$area": 6.75,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.28903507030193165)),
									"priority": "500",
									"start": "Fri Nov 21 08:00:00 EST 2003",
									"finish": "Mon Dec 01 15:00:00 EST 2003",
									"duration": "6.75",
									"percentageComplete": "0.28903507030193165",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "236",
									"name": "Configure Project Server",
									"data": 
									{
										"$area": 5.75,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.09222028418859363)),
										"priority": "500",
										"start": "Fri Nov 21 08:00:00 EST 2003",
										"finish": "Fri Nov 28 15:00:00 EST 2003",
										"duration": "5.75",
										"percentageComplete": "0.09222028418859363",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "237",
										"name": "Configure Project Server subwebs",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8763872450035126)),
											"priority": "500",
											"start": "Fri Nov 21 08:00:00 EST 2003",
											"finish": "Fri Nov 21 10:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.8763872450035126",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "238",
										"name": "Implement EPM Enterprise Implementation Framework outputs in enterprise global template",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15415716711651195)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Tue Nov 25 10:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.15415716711651195",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "239",
										"name": "Map resources and users to Windows user accounts",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.10715130037547682)),
											"priority": "500",
											"start": "Tue Nov 25 10:00:00 EST 2003",
											"finish": "Wed Nov 26 10:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.10715130037547682",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "240",
										"name": "Implement resources in enterprise resource pool",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18924857889587754)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Mon Nov 24 10:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.18924857889587754",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "241",
										"name": "Implement security schema in Project Server",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19286954992563943)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Fri Nov 21 15:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.19286954992563943",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "242",
										"name": "Implement Project Center views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.48452095509223303)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Mon Nov 24 10:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.48452095509223303",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "243",
										"name": "Implement Project views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3941596239503189)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Mon Nov 24 10:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.3941596239503189",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "244",
										"name": "Implement Resource Center views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.23079677094540074)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Fri Nov 21 15:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.23079677094540074",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "245",
										"name": "Implement Assignment views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5868756851937279)),
											"priority": "500",
											"start": "Fri Nov 21 08:00:00 EST 2003",
											"finish": "Fri Nov 21 17:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.5868756851937279",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "246",
										"name": "Implement Portfolio Analyzer views in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9053616045245061)),
											"priority": "500",
											"start": "Fri Nov 21 08:00:00 EST 2003",
											"finish": "Fri Nov 21 17:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.9053616045245061",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "247",
										"name": "Create models in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5388575829838524)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Fri Nov 21 15:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.5388575829838524",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "248",
										"name": "Obtain and configure SMTP server information",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.10968602349468715)),
											"priority": "500",
											"start": "Fri Nov 21 10:00:00 EST 2003",
											"finish": "Fri Nov 21 12:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.10968602349468715",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "249",
										"name": "Implement notifications and reminders in Project Server",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07567753725206527)),
											"priority": "500",
											"start": "Fri Nov 21 13:00:00 EST 2003",
											"finish": "Fri Nov 21 15:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.07567753725206527",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "250",
										"name": "Execute Migration Plan",
										"data": 
										{
											"$area": 5.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6711034969121065)),
											"priority": "500",
											"start": "Fri Nov 21 15:00:00 EST 2003",
											"finish": "Fri Nov 28 15:00:00 EST 2003",
											"duration": "5.0",
											"percentageComplete": "0.6711034969121065",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										{
											"id": "251",
											"name": "Migrate resources",
											"data": 
											{
												"$area": 2.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.09097514935893725)),
												"priority": "500",
												"start": "Fri Nov 21 15:00:00 EST 2003",
												"finish": "Tue Nov 25 15:00:00 EST 2003",
												"duration": "2.0",
												"percentageComplete": "0.09097514935893725",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "252",
											"name": "Migrate project plans",
											"data": 
											{
												"$area": 2.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6019458107414941)),
												"priority": "500",
												"start": "Fri Nov 21 15:00:00 EST 2003",
												"finish": "Tue Nov 25 15:00:00 EST 2003",
												"duration": "2.0",
												"percentageComplete": "0.6019458107414941",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "253",
											"name": "Migrate templates",
											"data": 
											{
												"$area": 1.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4594819111359676)),
												"priority": "500",
												"start": "Fri Nov 21 15:00:00 EST 2003",
												"finish": "Mon Nov 24 15:00:00 EST 2003",
												"duration": "1.0",
												"percentageComplete": "0.4594819111359676",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "254",
											"name": "Migrate databases",
											"data": 
											{
												"$area": 2.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4525571377072509)),
												"priority": "500",
												"start": "Fri Nov 21 15:00:00 EST 2003",
												"finish": "Tue Nov 25 15:00:00 EST 2003",
												"duration": "2.0",
												"percentageComplete": "0.4525571377072509",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "255",
											"name": "Migrate macros",
											"data": 
											{
												"$area": 5.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9275132138047397)),
												"priority": "500",
												"start": "Fri Nov 21 15:00:00 EST 2003",
												"finish": "Fri Nov 28 15:00:00 EST 2003",
												"duration": "5.0",
												"percentageComplete": "0.9275132138047397",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										},
										{
											"id": "256",
											"name": "Migrate custom Project Guides",
											"data": 
											{
												"$area": 5.0,
												"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9389444486598142)),
												"priority": "500",
												"start": "Fri Nov 21 15:00:00 EST 2003",
												"finish": "Fri Nov 28 15:00:00 EST 2003",
												"duration": "5.0",
												"percentageComplete": "0.9389444486598142",
												"milestone": "false",
												"notes": ""
											},
											"children": 
											[
											]
										}
										]
									}
									]
								},
								{
									"id": "257",
									"name": "Configure Microsoft SharePoint Portal Server \"v2.0\"",
									"data": 
									{
										"$area": 0.5,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8505302142873884)),
										"priority": "500",
										"start": "Fri Nov 28 15:00:00 EST 2003",
										"finish": "Mon Dec 01 10:00:00 EST 2003",
										"duration": "0.5",
										"percentageComplete": "0.8505302142873884",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "258",
										"name": "Set up Microsoft SharePoint Portal Server \"v2.0\" connection in Microsoft Office Project Web Access 2003",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9319271342095261)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 10:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.9319271342095261",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "259",
										"name": "Configure Microsoft SharePoint Portal Server \"v2.0\" indexing",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7012326438889954)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 10:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.7012326438889954",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "260",
										"name": "Connect existing team sites to the portal",
										"data": 
										{
											"$area": 4.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8070755321837046)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 10:00:00 EST 2003",
											"duration": "4.0",
											"percentageComplete": "0.8070755321837046",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									}
									]
								},
								{
									"id": "261",
									"name": "Configure Windows SharePoint Services",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.034379440897816305)),
										"priority": "500",
										"start": "Fri Nov 28 15:00:00 EST 2003",
										"finish": "Mon Dec 01 15:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.034379440897816305",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "262",
										"name": "Validate PSCOMPlus settings",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.42278598291883007)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Fri Nov 28 17:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.42278598291883007",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "263",
										"name": "Configure proxy server",
										"data": 
										{
											"$area": 2.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.46854893000911946)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Fri Nov 28 17:00:00 EST 2003",
											"duration": "2.0",
											"percentageComplete": "0.46854893000911946",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "264",
										"name": "Configure SharePoint connection settings and site creation settings",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8923142620266827)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 15:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.8923142620266827",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "265",
										"name": "Configure Windows SharePoint Services site templates",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8068765197947825)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 15:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.8068765197947825",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "266",
										"name": "Configure cross-web security",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9301661702929483)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 15:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.9301661702929483",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									}
									]
								},
								{
									"id": "267",
									"name": "Configure Analysis Services",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5677044177190006)),
										"priority": "500",
										"start": "Fri Nov 28 15:00:00 EST 2003",
										"finish": "Mon Dec 01 15:00:00 EST 2003",
										"duration": "1.0",
										"percentageComplete": "0.5677044177190006",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									{
										"id": "268",
										"name": "Assign cube roles and permissions",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6467323318864804)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 15:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.6467323318864804",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									},
									{
										"id": "269",
										"name": "Validate PSCOMPlus OLAP identity",
										"data": 
										{
											"$area": 1.0,
											"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8445637830373638)),
											"priority": "500",
											"start": "Fri Nov 28 15:00:00 EST 2003",
											"finish": "Mon Dec 01 15:00:00 EST 2003",
											"duration": "1.0",
											"percentageComplete": "0.8445637830373638",
											"milestone": "false",
											"notes": ""
										},
										"children": 
										[
										]
									}
									]
								}
								]
							}
							]
						},
						{
							"id": "270",
							"name": "Perform Desktop Deployment",
							"data": 
							{
								"$area": 5.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3455353423593497)),
								"priority": "500",
								"start": "Mon Dec 01 15:00:00 EST 2003",
								"finish": "Mon Dec 08 15:00:00 EST 2003",
								"duration": "5.0",
								"percentageComplete": "0.3455353423593497",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "271",
								"name": "Perform Scripted Deployment",
								"data": 
								{
									"$area": 2.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6191520560060305)),
									"priority": "500",
									"start": "Mon Dec 01 15:00:00 EST 2003",
									"finish": "Wed Dec 03 15:00:00 EST 2003",
									"duration": "2.0",
									"percentageComplete": "0.6191520560060305",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "272",
									"name": "Create deployment script",
									"data": 
									{
										"$area": 2.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18860109848419015)),
										"priority": "500",
										"start": "Mon Dec 01 15:00:00 EST 2003",
										"finish": "Wed Dec 03 15:00:00 EST 2003",
										"duration": "2.0",
										"percentageComplete": "0.18860109848419015",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "273",
									"name": "Schedule running of deployment script",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6765938266296069)),
										"priority": "500",
										"start": "Mon Dec 01 15:00:00 EST 2003",
										"finish": "Tue Dec 02 10:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.6765938266296069",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "274",
								"name": "Deploy Terminal Services Client",
								"data": 
								{
									"$area": 20.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.0060906698210484445)),
									"priority": "500",
									"start": "Mon Dec 01 15:00:00 EST 2003",
									"finish": "Thu Dec 04 10:00:00 EST 2003",
									"duration": "20.0",
									"percentageComplete": "0.0060906698210484445",
									"milestone": "false",
									"notes": "Using Terminal Services Client will improve performance if you have project managers connecting to your Project Server over a WAN.\n"
								},
								"children": 
								[
								]
							},
							{
								"id": "275",
								"name": "Perform Manual Deployment",
								"data": 
								{
									"$area": 3.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.595054799533663)),
									"priority": "500",
									"start": "Mon Dec 01 15:00:00 EST 2003",
									"finish": "Thu Dec 04 15:00:00 EST 2003",
									"duration": "3.0",
									"percentageComplete": "0.595054799533663",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "276",
									"name": "Develop specifications and documentation for running Setup",
									"data": 
									{
										"$area": 3.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8179851338646663)),
										"priority": "500",
										"start": "Mon Dec 01 15:00:00 EST 2003",
										"finish": "Thu Dec 04 15:00:00 EST 2003",
										"duration": "3.0",
										"percentageComplete": "0.8179851338646663",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "277",
									"name": "Provide location to run Setup",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8046371433659173)),
										"priority": "500",
										"start": "Mon Dec 01 15:00:00 EST 2003",
										"finish": "Tue Dec 02 10:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.8046371433659173",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "278",
								"name": "Configure Internet Explorer",
								"data": 
								{
									"$area": 0.5,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8144823049647445)),
									"priority": "500",
									"start": "Mon Dec 01 15:00:00 EST 2003",
									"finish": "Tue Dec 02 10:00:00 EST 2003",
									"duration": "0.5",
									"percentageComplete": "0.8144823049647445",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "279",
									"name": "Configure trusted sites",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8730400764497401)),
										"priority": "500",
										"start": "Mon Dec 01 15:00:00 EST 2003",
										"finish": "Tue Dec 02 10:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.8730400764497401",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "280",
									"name": "Configure automatic download of ActiveX in trusted sites zone",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7320422508644451)),
										"priority": "500",
										"start": "Mon Dec 01 15:00:00 EST 2003",
										"finish": "Tue Dec 02 10:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.7320422508644451",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "281",
									"name": "Allow cookies",
									"data": 
									{
										"$area": 4.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.28074586673620905)),
										"priority": "500",
										"start": "Mon Dec 01 15:00:00 EST 2003",
										"finish": "Tue Dec 02 10:00:00 EST 2003",
										"duration": "4.0",
										"percentageComplete": "0.28074586673620905",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "282",
								"name": "Install the Microsoft Office System on desktop as desired/needed",
								"data": 
								{
									"$area": 5.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5925154188748314)),
									"priority": "500",
									"start": "Mon Dec 01 15:00:00 EST 2003",
									"finish": "Mon Dec 08 15:00:00 EST 2003",
									"duration": "5.0",
									"percentageComplete": "0.5925154188748314",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "283",
							"name": "Implement production versions of planned system integrations",
							"data": 
							{
								"$area": 30.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5975061578474915)),
								"priority": "500",
								"start": "Mon Dec 08 15:00:00 EST 2003",
								"finish": "Mon Jan 19 15:00:00 EST 2004",
								"duration": "30.0",
								"percentageComplete": "0.5975061578474915",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "284",
							"name": "Test the Production Deployment",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.532687528640063)),
								"priority": "500",
								"start": "Mon Jan 19 15:00:00 EST 2004",
								"finish": "Tue Jan 20 15:00:00 EST 2004",
								"duration": "1.0",
								"percentageComplete": "0.532687528640063",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							{
								"id": "285",
								"name": "Test system function",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1018969088887216)),
									"priority": "500",
									"start": "Mon Jan 19 15:00:00 EST 2004",
									"finish": "Tue Jan 20 15:00:00 EST 2004",
									"duration": "1.0",
									"percentageComplete": "0.1018969088887216",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							},
							{
								"id": "286",
								"name": "Resolve issues",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.43818841122804886)),
									"priority": "500",
									"start": "Mon Jan 19 15:00:00 EST 2004",
									"finish": "Tue Jan 20 15:00:00 EST 2004",
									"duration": "1.0",
									"percentageComplete": "0.43818841122804886",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								{
									"id": "287",
									"name": "Resolve connectivity problems",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3255237596351127)),
										"priority": "500",
										"start": "Mon Jan 19 15:00:00 EST 2004",
										"finish": "Tue Jan 20 15:00:00 EST 2004",
										"duration": "1.0",
										"percentageComplete": "0.3255237596351127",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								},
								{
									"id": "288",
									"name": "Resolve installation problems",
									"data": 
									{
										"$area": 1.0,
										"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5544897064011485)),
										"priority": "500",
										"start": "Mon Jan 19 15:00:00 EST 2004",
										"finish": "Tue Jan 20 15:00:00 EST 2004",
										"duration": "1.0",
										"percentageComplete": "0.5544897064011485",
										"milestone": "false",
										"notes": ""
									},
									"children": 
									[
									]
								}
								]
							},
							{
								"id": "289",
								"name": "Scrub test data",
								"data": 
								{
									"$area": 1.0,
									"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5436233498965742)),
									"priority": "500",
									"start": "Mon Jan 19 15:00:00 EST 2004",
									"finish": "Tue Jan 20 15:00:00 EST 2004",
									"duration": "1.0",
									"percentageComplete": "0.5436233498965742",
									"milestone": "false",
									"notes": ""
								},
								"children": 
								[
								]
							}
							]
						},
						{
							"id": "290",
							"name": "Deploy production system complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5509633311777152)),
								"priority": "500",
								"start": "Tue Jan 20 15:00:00 EST 2004",
								"finish": "Tue Jan 20 15:00:00 EST 2004",
								"duration": "0.0",
								"percentageComplete": "0.5509633311777152",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "291",
						"name": "Migrate Pilot Data to Production",
						"data": 
						{
							"$area": 4.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.11398083428995587)),
							"priority": "500",
							"start": "Tue Jan 20 15:00:00 EST 2004",
							"finish": "Mon Jan 26 15:00:00 EST 2004",
							"duration": "4.0",
							"percentageComplete": "0.11398083428995587",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "292",
							"name": "Migrate pilot databases",
							"data": 
							{
								"$area": 1.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7927585240205796)),
								"priority": "500",
								"start": "Tue Jan 20 15:00:00 EST 2004",
								"finish": "Wed Jan 21 15:00:00 EST 2004",
								"duration": "1.0",
								"percentageComplete": "0.7927585240205796",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "293",
							"name": "Migrate Windows SharePoint Services information",
							"data": 
							{
								"$area": 2.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.10703481219456223)),
								"priority": "500",
								"start": "Wed Jan 21 15:00:00 EST 2004",
								"finish": "Fri Jan 23 15:00:00 EST 2004",
								"duration": "2.0",
								"percentageComplete": "0.10703481219456223",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "294",
							"name": "Migrate or rebuild OLAP cubes",
							"data": 
							{
								"$area": 4.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6216141976501953)),
								"priority": "500",
								"start": "Fri Jan 23 15:00:00 EST 2004",
								"finish": "Mon Jan 26 10:00:00 EST 2004",
								"duration": "4.0",
								"percentageComplete": "0.6216141976501953",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "295",
							"name": "Migrate Portfolio Analyzer views",
							"data": 
							{
								"$area": 4.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7691708386743547)),
								"priority": "500",
								"start": "Mon Jan 26 10:00:00 EST 2004",
								"finish": "Mon Jan 26 15:00:00 EST 2004",
								"duration": "4.0",
								"percentageComplete": "0.7691708386743547",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "296",
							"name": "Migrate pilot data to production complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.25089541522795267)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Mon Jan 26 15:00:00 EST 2004",
								"duration": "0.0",
								"percentageComplete": "0.25089541522795267",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "297",
						"name": "Deployment complete",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6110539524925636)),
							"priority": "500",
							"start": "Mon Jan 26 15:00:00 EST 2004",
							"finish": "Mon Jan 26 15:00:00 EST 2004",
							"duration": "0.0",
							"percentageComplete": "0.6110539524925636",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					}
					]
				},
				{
					"id": "298",
					"name": "Post-deployment",
					"data": 
					{
						"$area": 30.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.42008513125976865)),
						"priority": "500",
						"start": "Mon Jan 26 15:00:00 EST 2004",
						"finish": "Mon Mar 08 15:00:00 EST 2004",
						"duration": "30.0",
						"percentageComplete": "0.42008513125976865",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "299",
						"name": "Implement and Test Backup",
						"data": 
						{
							"$area": 1.25,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18754687223118494)),
							"priority": "500",
							"start": "Mon Jan 26 15:00:00 EST 2004",
							"finish": "Tue Jan 27 17:00:00 EST 2004",
							"duration": "1.25",
							"percentageComplete": "0.18754687223118494",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "300",
							"name": "Implement backup strategy for Project Server",
							"data": 
							{
								"$area": 4.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12616900261975184)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Tue Jan 27 10:00:00 EST 2004",
								"duration": "4.0",
								"percentageComplete": "0.12616900261975184",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "301",
							"name": "Implement backup strategy for Windows SharePoint Services",
							"data": 
							{
								"$area": 4.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2990067001621137)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Tue Jan 27 10:00:00 EST 2004",
								"duration": "4.0",
								"percentageComplete": "0.2990067001621137",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "302",
							"name": "Test Project Server backup strategy",
							"data": 
							{
								"$area": 4.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3304663115987688)),
								"priority": "500",
								"start": "Tue Jan 27 10:00:00 EST 2004",
								"finish": "Tue Jan 27 15:00:00 EST 2004",
								"duration": "4.0",
								"percentageComplete": "0.3304663115987688",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "303",
							"name": "Test Windows SharePoint Services backup strategy",
							"data": 
							{
								"$area": 4.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.25403838291553105)),
								"priority": "500",
								"start": "Tue Jan 27 10:00:00 EST 2004",
								"finish": "Tue Jan 27 15:00:00 EST 2004",
								"duration": "4.0",
								"percentageComplete": "0.25403838291553105",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "304",
							"name": "Implement and test disaster planning and recovery strategy",
							"data": 
							{
								"$area": 2.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07958324627413471)),
								"priority": "500",
								"start": "Tue Jan 27 15:00:00 EST 2004",
								"finish": "Tue Jan 27 17:00:00 EST 2004",
								"duration": "2.0",
								"percentageComplete": "0.07958324627413471",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "305",
							"name": "Implement and test backup complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.982475056269552)),
								"priority": "500",
								"start": "Tue Jan 27 17:00:00 EST 2004",
								"finish": "Tue Jan 27 17:00:00 EST 2004",
								"duration": "0.0",
								"percentageComplete": "0.982475056269552",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "306",
						"name": "Implement Performance Tuning and Monitoring",
						"data": 
						{
							"$area": 30.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15849294489418886)),
							"priority": "500",
							"start": "Mon Jan 26 15:00:00 EST 2004",
							"finish": "Mon Mar 08 15:00:00 EST 2004",
							"duration": "30.0",
							"percentageComplete": "0.15849294489418886",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "307",
							"name": "Observe performance parameters using performance monitor",
							"data": 
							{
								"$area": 30.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08343664739995194)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "30.0",
								"percentageComplete": "0.08343664739995194",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "308",
							"name": "Compare performance to plan",
							"data": 
							{
								"$area": 30.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2867065154931927)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "30.0",
								"percentageComplete": "0.2867065154931927",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "309",
							"name": "Tweak settings as needed",
							"data": 
							{
								"$area": 30.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8638640079689354)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "30.0",
								"percentageComplete": "0.8638640079689354",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "310",
							"name": "Re-forecast demand and plan appropriately",
							"data": 
							{
								"$area": 30.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7863426348848455)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "30.0",
								"percentageComplete": "0.7863426348848455",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "311",
							"name": "Implement performance tuning and monitoring complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5705141968542564)),
								"priority": "500",
								"start": "Mon Mar 08 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "0.0",
								"percentageComplete": "0.5705141968542564",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "312",
						"name": "Set up System Maintenance",
						"data": 
						{
							"$area": 30.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.178123217929529)),
							"priority": "500",
							"start": "Mon Jan 26 15:00:00 EST 2004",
							"finish": "Mon Mar 08 15:00:00 EST 2004",
							"duration": "30.0",
							"percentageComplete": "0.178123217929529",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "313",
							"name": "Create SQL Server maintenance plans",
							"data": 
							{
								"$area": 4.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2163967901775914)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Tue Jan 27 10:00:00 EST 2004",
								"duration": "4.0",
								"percentageComplete": "0.2163967901775914",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "314",
							"name": "Administer user accounts",
							"data": 
							{
								"$area": 30.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07140297212675106)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "30.0",
								"percentageComplete": "0.07140297212675106",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "315",
							"name": "Monitor log and data files",
							"data": 
							{
								"$area": 30.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.089744982488)),
								"priority": "500",
								"start": "Mon Jan 26 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "30.0",
								"percentageComplete": "0.089744982488",
								"milestone": "false",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "316",
							"name": "Set up system maintenance complete",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7524242108708228)),
								"priority": "500",
								"start": "Mon Mar 08 15:00:00 EST 2004",
								"finish": "Mon Mar 08 15:00:00 EST 2004",
								"duration": "0.0",
								"percentageComplete": "0.7524242108708228",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						}
						]
					},
					{
						"id": "317",
						"name": "Obtain user feedback",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14156311526302312)),
							"priority": "500",
							"start": "Mon Jan 26 15:00:00 EST 2004",
							"finish": "Tue Jan 27 15:00:00 EST 2004",
							"duration": "1.0",
							"percentageComplete": "0.14156311526302312",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "318",
						"name": "Evaluate lessons learned",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08199278082789097)),
							"priority": "500",
							"start": "Tue Jan 27 15:00:00 EST 2004",
							"finish": "Wed Jan 28 15:00:00 EST 2004",
							"duration": "1.0",
							"percentageComplete": "0.08199278082789097",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "319",
						"name": "Modify items as necessary",
						"data": 
						{
							"$area": 3.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.00263581127694823)),
							"priority": "500",
							"start": "Wed Jan 28 15:00:00 EST 2004",
							"finish": "Mon Feb 02 15:00:00 EST 2004",
							"duration": "3.0",
							"percentageComplete": "0.00263581127694823",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "320",
						"name": "Establish on-going Microsoft Project users team",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.35806135848542264)),
							"priority": "500",
							"start": "Mon Feb 02 15:00:00 EST 2004",
							"finish": "Tue Feb 03 15:00:00 EST 2004",
							"duration": "1.0",
							"percentageComplete": "0.35806135848542264",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "321",
						"name": "Post-deployment complete",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6489806077206455)),
							"priority": "500",
							"start": "Mon Mar 08 15:00:00 EST 2004",
							"finish": "Mon Mar 08 15:00:00 EST 2004",
							"duration": "0.0",
							"percentageComplete": "0.6489806077206455",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					}
					]
				},
				{
					"id": "322",
					"name": "Microsoft Project 2003 deployment complete",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.30117908060779797)),
						"priority": "500",
						"start": "Mon Mar 08 15:00:00 EST 2004",
						"finish": "Mon Mar 08 15:00:00 EST 2004",
						"duration": "0.0",
						"percentageComplete": "0.30117908060779797",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				}
				]
			}
		]
	};
	treemap = new $jit.TM.Squarified(
	{
		injectInto: 'infovis',
		titleHeight: 15,
		levelsToShow: 4,
		animate: animate,
		offset: 0.2,
		Events:
		{
			enable: true,
			onClick: function(node)
			{
				if(node) treemap.enter(node);
			},
			onRightClick: function()
			{
				treemap.out();
			}
		},
		duration: 1000,
		Tips:
		{
			enable: true,
			offsetX: 20,
			offsetY: 20,
			onShow: function(tip, node, isLeaf, domElement)
			{
				var html = "<div class=\"tip-title\">" + node.name + "</div><div class=\"tip-text\">";
				var data = node.data;
				if(data.priority && priorityAttribute)
				{
					html += "<p></p>";
					html += "priority: " + data.priority;
				}
				if(data.start && startAttribute)
				{
					html += "<p></p>";
					html += "start: " + data.start;
				}
				if(data.finish && finishAttribute)
				{
					html += "<p></p>";
					html += "finish: " + data.finish;
				}
				if(data.duration && durationAttribute)
				{
					html += "<p></p>";
					html += "duration: " + data.duration;
				}
				if(data.percentageComplete && completeAttribute)
				{
					html += "<p></p>";
					html += "percent complete: " + Math.round(100*data.percentageComplete) + "%";
				}
				if(data.milestone && (data.milestone == "true"))
				{
					html += "<p></p>";
					html += "milestone: " + data.milestone;
				}
				if(data.notes)
				{
					html += "<p></p>";
					html += "notes: " + data.notes;
				}
				tip.innerHTML =  html;
			}
		},
		onBeforePlotNode: function(node)
		{
			if(node._depth > 0)
			{
				node.data.$color = ColorToHex(ColorBlend(colorCold, colorWarm, node.data.percentageComplete));
			}
		},
		onCreateLabel: function(domElement, node)
		{
			domElement.innerHTML = node.name;
			var style = domElement.style;
			style.display = '';
			style.border = '4px solid transparent';
			style.margin = '0px 0px 0px 0px';
			domElement.onmouseover = function()
			{
				style.border = '4px solid #FF0000';
				style.margin = '-4px 0px 0px -4px';
			};
			domElement.onmouseout = function()
			{
				style.border = '4px solid transparent';
				style.margin = '0px 0px 0px 0px';
			};
		},
		request: function(nodeId, level, onComplete)
		{
			onComplete.onComplete(nodeId, level);
		}
	});
	treemap.loadJSON(json);
	treemap.refresh();
	var util = $jit.util;
	var back = $jit.id('back');
	$jit.util.addEvent(back, 'click', function()
	{
		treemap.out();
	});
}