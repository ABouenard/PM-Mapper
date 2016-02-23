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
		"name": "MS_Plan_integration_SE-1493.mpp",
		"data":
		{
			"$color": "#606060"
		},
		"children":
		[
			{
				"id": "1",
				"name": "Project : Start",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18544888916373303)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 08:00:00 EDT 2011",
					"duration": "0.0",
					"percentageComplete": "0.18544888916373303",
					"milestone": "true",
					"notes": ""
				},
				"children": 
				[
				]
			},
			{
				"id": "2",
				"name": "Project Management",
				"data": 
				{
					"$area": 1.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8860588971822633)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 16:30:00 EDT 2011",
					"duration": "1.0",
					"percentageComplete": "0.8860588971822633",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "3",
					"name": "Project Management : Activities",
					"data": 
					{
						"$area": 1.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7241343346331308)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 16:30:00 EDT 2011",
						"duration": "1.0",
						"percentageComplete": "0.7241343346331308",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "4",
						"name": "Project Management : Mgmt Activities (CAPEX)",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7797541555687048)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7797541555687048",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "5",
						"name": "Project Management : PCO (OPEX)",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4868545240899743)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.4868545240899743",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "389",
						"name": "Project Management : PCO Operational (Capex)",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.32253967810630113)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 16:30:00 EDT 2011",
							"duration": "1.0",
							"percentageComplete": "0.32253967810630113",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "387",
						"name": "Project Management : PM.010-Project log",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4596286974723238)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 16:30:00 EDT 2011",
							"duration": "1.0",
							"percentageComplete": "0.4596286974723238",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "386",
						"name": "Project Management : PM.020-Management committee status report",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9996950676788646)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 16:30:00 EDT 2011",
							"duration": "1.0",
							"percentageComplete": "0.9996950676788646",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "385",
						"name": "Project Management : PM.030-Executive committee status report",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5784270571070389)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 16:30:00 EDT 2011",
							"duration": "1.0",
							"percentageComplete": "0.5784270571070389",
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
					"id": "6",
					"name": "Project Management : Deliverables",
					"data": 
					{
						"$area": 1.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8639467087171144)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 16:30:00 EDT 2011",
						"duration": "1.0",
						"percentageComplete": "0.8639467087171144",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "7",
						"name": "Project Management : PP.010-Project Plan",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3586909117808528)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.3586909117808528",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "8",
						"name": "Project Management : PP.020-Project Schedule",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2773475717796119)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.2773475717796119",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "10",
						"name": "Project Management : P.030-Project Cost Estimate",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9016744190699866)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9016744190699866",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "17",
						"name": "Project Management : PP.050-Risk Management Strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.39690653171355883)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.39690653171355883",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "12",
						"name": "Project Management : PP.060-Project Team training Strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2949908712885463)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.2949908712885463",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "22",
						"name": "Project Management : PP.065-Resources Evaluation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7585615434297558)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7585615434297558",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "20",
						"name": "Project Management : PP.070-Quality Assurance Strategy (Milestone Check list)",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4723393566060632)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.4723393566060632",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "9",
						"name": "Project Management : Role and Responsibility Matrix (Milestone)",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7462626843762975)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7462626843762975",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "384",
						"name": "Project Management : PP.075- Test Strategy",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7135034135196405)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 16:30:00 EDT 2011",
							"duration": "1.0",
							"percentageComplete": "0.7135034135196405",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "19",
						"name": "Project Management : PP.080-Procurement Strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5153571477799138)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.5153571477799138",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "15",
						"name": "Project Management : PP.090-Architecture Strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7260747473023305)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7260747473023305",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "16",
						"name": "Project Management : PP.100-Outsourcing Strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5266270562755843)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.5266270562755843",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "13",
						"name": "Project Management : PP.110-High Level Change Management Strategy (P&C)",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07333505790409789)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.07333505790409789",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "388",
						"name": "Project Management : PP.120-Oriented Project team",
						"data": 
						{
							"$area": 1.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8241913305928783)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 16:30:00 EDT 2011",
							"duration": "1.0",
							"percentageComplete": "0.8241913305928783",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "11",
						"name": "Project Management : Project Communication Strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.35523865300815494)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.35523865300815494",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "14",
						"name": "Project Management : Operational Choices strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9972052353506952)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9972052353506952",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "18",
						"name": "Project Management : Team Management Strategy",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19706742872296656)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.19706742872296656",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "21",
						"name": "Project Management : PP.130-Project Kick-Off Presentation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.54154874327118)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.54154874327118",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "23",
						"name": "Project Management : Post-Mortem",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.424868082491927)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.424868082491927",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "24",
						"name": "Project Management : End",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2388848614466602)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.2388848614466602",
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
					"id": "25",
					"name": "Project Management : Milestones",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6725499418793482)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.6725499418793482",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "26",
						"name": "Project Management : Milestone PM3 - Project Plan compliance (PMO)",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7003253635143334)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7003253635143334",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "27",
						"name": "Project Management : Milestone PM4 - Project Plan approval (Executive committee)",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3611589578117056)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.3611589578117056",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "28",
						"name": "Project Management : Milestone CM1 - Solution Selection or Preliminary Analysis",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.006171825317120794)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.006171825317120794",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "29",
						"name": "Project Management : Milestone CM2 - Fit & Gap and Technical Design or Functional & Technical Design",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.168154893502527)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.168154893502527",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "30",
						"name": "Project Management : Milestone PM5 - Budget Review",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.22195873884484418)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.22195873884484418",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "31",
						"name": "Project Management : Milestone CM3 - Build",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9900446352454134)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9900446352454134",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "32",
						"name": "Project Management : Milestone CM4 - User Acceptance",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.06247527486084903)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.06247527486084903",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "33",
						"name": "Project Management : Milestone CM5 - Production",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5876717120310164)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.5876717120310164",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "34",
						"name": "Project Management : Milestone PM6 - Delivery Acceptance",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.27451803674333497)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.27451803674333497",
							"milestone": "true",
							"notes": ""
						},
						"children": 
						[
						]
					},
					{
						"id": "35",
						"name": "Project Management : Milestone PM7 - Project Closure",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.29099476234321475)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.29099476234321475",
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
			},
			{
				"id": "36",
				"name": "SALC/SDLC/VSDLC",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1549780390108637)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 08:00:00 EDT 2011",
					"duration": "0.0",
					"percentageComplete": "0.1549780390108637",
					"milestone": "false",
					"notes": "[2011-04-15 06:59:32 martfau (5028738)]\n\tUne fois copi \u00E9 dans votre projet :\n[2011-04-15 06:59:32 martfau (5028739)]\n\t-  \u00C9liminez la t\u00E2che r\u00E9capitutalive du cycle de vie \"SALC/SDLC/VSDLC\"\n[2011-04-15 06:59:32 martfau (5028740)]\n\t-  \u00C9liminer la t\u00E2che r\u00E9capitulative de la phase \"Fit & Gap ou ...\"\n[2011-04-15 06:59:32 martfau (5028741)]\n\t- Ne conserver que les Domaines en Niveau1\n\nAjouter une ou plusieurs nouvelles notes ici :\n"
				},
				"children": 
				[
				{
					"id": "37",
					"name": "Solution Selection or Preliminary Analysis",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6948023580919107)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.6948023580919107",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "38",
						"name": "Business Modeling",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7442330248982949)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7442330248982949",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "39",
							"name": "BM.020 - Catalog and Analyze Potential Changes",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.23129310321244634)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.23129310321244634",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "40",
							"name": "BM.030 - Determine Data Gathering  Requirements",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07536284379653091)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.07536284379653091",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "41",
							"name": "BM.040 - Develop Current Process Model",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3160100357145802)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3160100357145802",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "42",
							"name": "BM.050 - Review Leading Practices",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4991496984973497)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4991496984973497",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "43",
							"name": "BM.070 - Develop High-Level Process Designs",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7231295460087741)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7231295460087741",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "44",
							"name": "BM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8345278029137434)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8345278029137434",
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
						"id": "45",
						"name": "Business Requirements",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.16486667746652217)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.16486667746652217",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "46",
							"name": "BR.020 - Conduct Current Business Baseline",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4662019705481405)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4662019705481405",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "47",
							"name": "BR.050 - Gather Business Requirements",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5020413845263605)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5020413845263605",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "48",
							"name": "BR : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4629653115818928)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4629653115818928",
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
						"id": "49",
						"name": "Change Management",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.24042934475457423)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.24042934475457423",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "50",
							"name": "CM.010 - Define Executive Project Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.680613218376217)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.680613218376217",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "51",
							"name": "CM.020 - Conduct Initial Project Team Orientation",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9636577418766805)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9636577418766805",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "52",
							"name": "CM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2180929423489375)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.2180929423489375",
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
						"id": "53",
						"name": "Documentation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.0198452437274953)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.0198452437274953",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "54",
							"name": "DO.010 - Initial Documentation Requirements and Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.728861467137358)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.728861467137358",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "55",
							"name": "DO.030 - Glossary",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.04674957165601357)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.04674957165601357",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "56",
							"name": "DO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5666070019143992)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5666070019143992",
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
						"id": "57",
						"name": "Data Quality",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2868323872110573)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.2868323872110573",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "58",
							"name": "DQ.010 Data Quality Assessment Directives",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15285374516297578)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.15285374516297578",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "59",
							"name": "DQ.020 Data Quality Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5498742621205124)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5498742621205124",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "60",
							"name": "DQ : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8541599599371702)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8541599599371702",
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
						"id": "61",
						"name": "Solution Architecture",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4371100475219025)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.4371100475219025",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "62",
							"name": "SA.010 Define Architecture Requirements and Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9079930948064171)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9079930948064171",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "63",
							"name": "SA.020 Identify Current Technical Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5560851163595673)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5560851163595673",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "64",
							"name": "SA.030 Develop Conceptual Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6752052308784203)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6752052308784203",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "65",
							"name": "SA.050 Define Non-Functional Requirements",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.829754063569698)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.829754063569698",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "66",
							"name": "SA : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.26455228773354567)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.26455228773354567",
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
						"id": "67",
						"name": "Testing",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5728361775043821)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.5728361775043821",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "68",
							"name": "TS.010 - Global Test Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12577413072695165)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.12577413072695165",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "69",
							"name": "TS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14941966887815283)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.14941966887815283",
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
						"id": "70",
						"name": "Vendor Selection",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9108648287710077)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9108648287710077",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "71",
							"name": "VS.010 Market Segmentation Information",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3620538673596183)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3620538673596183",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "72",
							"name": "VS.020 Vendor Dossier",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3860577176984782)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3860577176984782",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "73",
							"name": "VS.030 Commercial-off-the-shelf Package Dossier",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4809378633637553)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4809378633637553",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "74",
							"name": "VS.040 Commercial-off-the-shelf Package Screening Criteria and Rationale",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18930220203385373)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.18930220203385373",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "75",
							"name": "VS.050 Evaluation Score Sheet",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.420314348071525)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.420314348071525",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "76",
							"name": "VS.060 Manage Request for Information",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6408393941500447)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6408393941500447",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "77",
							"name": "VS.070 Request for Information Response",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.851431657972732)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.851431657972732",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "78",
							"name": "VS.080 Vendor and Package Evaluation Workshop Description",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.14447270523041433)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.14447270523041433",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "79",
							"name": "VS.090 Evaluate Vendor Scoring",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19513419557466138)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.19513419557466138",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "80",
							"name": "VS.099 Provide the Non Disclosure Agreement letter",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5146249466550472)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5146249466550472",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "81",
							"name": "VS.100 Request for Proposal issued",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.32889047202719646)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.32889047202719646",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "82",
							"name": "VS.110 Request for Proposal response",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.17714210168759892)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.17714210168759892",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "83",
							"name": "VS.115 Proof of concept Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.31792297447905793)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.31792297447905793",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "84",
							"name": "VS.116 Request for Proof of concept",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.169236422989684)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.169236422989684",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "85",
							"name": "VS.120 Cumulative Candidate Solution Evaluation Summary and Recommendation",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6579828795049169)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6579828795049169",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "86",
							"name": "VS.130 Contract",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.37786457648584504)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.37786457648584504",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "87",
							"name": "VS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6639019121577225)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6639019121577225",
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
						"name": "Solution Selection or Preliminary Analysis  : End",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.23866849232912635)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.23866849232912635",
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
					"id": "89",
					"name": "Fit & Gap Analysis or Functional Analysis",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07464451473883105)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.07464451473883105",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "90",
						"name": "Business Modeling",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2747575337647876)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.2747575337647876",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "91",
							"name": "BM.025 - Update Change Catalog",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.01900957378465651)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.01900957378465651",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "92",
							"name": "BM.080 - Develop Future Process Model",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6525822789317081)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6525822789317081",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "93",
							"name": "BM.090 - Document Business Procedures",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6470912097054463)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6470912097054463",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "94",
							"name": "BM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.01034235011806095)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.01034235011806095",
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
						"id": "95",
						"name": "Business Requirements",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6969862049141241)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.6969862049141241",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "96",
							"name": "BR.030 - Establish Process and Mapping Summary",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5708073932255818)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5708073932255818",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "97",
							"name": "BR.040 - Gather Business Volumes and Metrics",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5899948634622951)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5899948634622951",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "98",
							"name": "BR.050 - Gather Business Scenarios",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.529006547919416)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.529006547919416",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "99",
							"name": "BR.060 - Determine Audit and Control Requirements",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21321347673492486)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.21321347673492486",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "100",
							"name": "BR.080 - Master Report Tracking List",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4575152882811967)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4575152882811967",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "101",
							"name": "BR.090 - High-Level Gap Analysis",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.17307122606539482)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.17307122606539482",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "102",
							"name": "BR.100 - Map Business Requirements",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9527519842576885)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9527519842576885",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "103",
							"name": "BR.110 - Conduct Reporting Analysis",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.36136622016890707)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.36136622016890707",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "104",
							"name": "BR.120 - Business Mapping Test Results",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.13201865697466197)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.13201865697466197",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "105",
							"name": "BR.130 - Confirm Business Solutions",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15488814945802942)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.15488814945802942",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "106",
							"name": "BR : Acceptance Criteria Definition",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7346534448059948)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7346534448059948",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "107",
							"name": "BR : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6466943692496123)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6466943692496123",
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
						"id": "108",
						"name": "Change Management",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.43745703399774016)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.43745703399774016",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "109",
							"name": "CM.005 - Change Management Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5865681552535597)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5865681552535597",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "110",
							"name": "CM.030 - Develop Project Team Learning Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.26798367026215797)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.26798367026215797",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "111",
							"name": "CM.040 - Skilled Project Team",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.0074166784589425605)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.0074166784589425605",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "112",
							"name": "CM.050 - Develop Business Unit Manager's Readiness Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.24545759128882572)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.24545759128882572",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "113",
							"name": "CM.060 - Develop Project Readiness Roadmap",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5133336834854332)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5133336834854332",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "114",
							"name": "CM.070 - Develop and Execute Communication Campaign",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6285504319586476)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6285504319586476",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "115",
							"name": "CM.080 - Develop Manager's Readiness Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1336147122534942)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.1336147122534942",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "116",
							"name": "CM.090 - Identify Business Process Impact on Organization",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.40512845492566596)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.40512845492566596",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "117",
							"name": "CM.100 - Align Human Performance Support Systems",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.31221253107804503)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.31221253107804503",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "118",
							"name": "CM.110 - Align IT Groups",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8937389967824041)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8937389967824041",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "119",
							"name": "CM.120 - Conduct User Learning Needs Analysis",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8484071402442841)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8484071402442841",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "120",
							"name": "CM.130 - Develop User Learning Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5402808586118684)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5402808586118684",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "121",
							"name": "CM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.09933202561946264)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.09933202561946264",
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
						"id": "122",
						"name": "Conception",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7384097037557487)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7384097037557487",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "123",
							"name": "CO.010 - Define Application Setups",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.42303416174291164)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.42303416174291164",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "124",
							"name": "CO.020 - Define Security Profiles",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4411042432767909)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4411042432767909",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "125",
							"name": "CO.030 - Define Application, Interface and Report Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.39641181516152224)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.39641181516152224",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "126",
							"name": "CO.040 - Define Estimate for Application, Interface and Report",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6760980029114513)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6760980029114513",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "127",
							"name": "CO.050 - Define Data Conversion Requirements and Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.04150178738024546)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.04150178738024546",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "128",
							"name": "CO.060 - Define Design Standards",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9696133278712784)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9696133278712784",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "129",
							"name": "CO.070 - Define Build Standards",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21713852963055036)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.21713852963055036",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "130",
							"name": "CO.080 - Define Application, Interface and Report Functional Design",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.09839776289627788)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.09839776289627788",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "131",
							"name": "CO.090 - Define Canonical Extensions",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.269653314763603)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.269653314763603",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "132",
							"name": "CO.100 - Define Database Extensions",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.300691779107117)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.300691779107117",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "133",
							"name": "CO.110 - Define Application, Interface and Report Technical Design",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9457840867571151)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9457840867571151",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "134",
							"name": "CO.120 - Define Integration Extensions Technical Design",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2483143901435313)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.2483143901435313",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "135",
							"name": "CO.130 - Define Conversion Standards",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.02313480721092498)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.02313480721092498",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "136",
							"name": "CO.140 - Perform Conversion Data Mapping",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5676060670990549)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5676060670990549",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "137",
							"name": "CO.150 - Define Manual Conversion Procedures",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.09095582521482648)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.09095582521482648",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "138",
							"name": "CO.160 - Define Conversion Program",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7043737369784656)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7043737369784656",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "139",
							"name": "CO.170 - Approve Functional and Technical Designs",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8603616390500136)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8603616390500136",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "140",
							"name": "CO.180 - Prepare CRP Environment or Configured Mapping Environment ???",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8719747546159035)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8719747546159035",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "141",
							"name": "CO.190 - Prepare Development Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.11747348119704382)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.11747348119704382",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "142",
							"name": "CO.200 - Prepare Testing Environments",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.46159498635634877)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.46159498635634877",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "143",
							"name": "CO.210 - Prepare Production Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6031912646839028)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6031912646839028",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "144",
							"name": "CO.220 - Prepare User Learning Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9283381117493651)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9283381117493651",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "145",
							"name": "CO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.024151447796958547)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.024151447796958547",
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
						"id": "146",
						"name": "Documentation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.00812631363594174)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.00812631363594174",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "147",
							"name": "DO.010 - Define Documentation Requirements and Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7296609644808791)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7296609644808791",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "148",
							"name": "DO.020 - Define Documentation Standards and Procedures",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12619433375060995)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.12619433375060995",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "149",
							"name": "DO.040 - Prepare Documentation Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.36273911822089233)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.36273911822089233",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "150",
							"name": "DO.050 - Produce Documentation Prototypes and Templates",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9216760619186226)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9216760619186226",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "151",
							"name": "DO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3877226389626336)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3877226389626336",
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
						"id": "152",
						"name": "Solution Architecture",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.39733483575517703)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.39733483575517703",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "153",
							"name": "SA.040 - Define Application Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.516080214835575)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.516080214835575",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "154",
							"name": "SA.060 - Map Business Data",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8428662835878608)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8428662835878608",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "155",
							"name": "SA.070 - Conduct Integration Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.42770636212797253)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.42770636212797253",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "156",
							"name": "SA.080 - Define Information Model",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.03388790502795158)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.03388790502795158",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "157",
							"name": "SA.090 - Define Reporting and Information Access Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6308416009733417)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6308416009733417",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "158",
							"name": "SA.100 - Propose Technical Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.286826460251952)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.286826460251952",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "159",
							"name": "SA.110 - Define the Environments Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.689686713931575)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.689686713931575",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "160",
							"name": "SA.120 - Define Application Security Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.20408171165933098)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.20408171165933098",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "161",
							"name": "SA.130 - Define Application and Database Server Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.511776258968618)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.511776258968618",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "162",
							"name": "SA.140 - Define and Propose Architecture Subsystems",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5134436422454899)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5134436422454899",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "163",
							"name": "SA.150 - Infrastructure Architecture Specification",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7775648567038193)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7775648567038193",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "164",
							"name": "SA.170 - Design CRP Environment or Configured Mapping Environment ???",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8951167173298584)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8951167173298584",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "165",
							"name": "SA.180 - Design Development Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6252332510196482)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6252332510196482",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "166",
							"name": "SA.190 - Design Testing Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8896580564849298)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8896580564849298",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "167",
							"name": "SA.200 - Design Production Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08415198243169597)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.08415198243169597",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "168",
							"name": "SA.210 - Design User Learning Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.583852200608354)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.583852200608354",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "169",
							"name": "SA.220 - Define Application Deployment Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5415215424047696)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5415215424047696",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "170",
							"name": "SA.230 - Assess Performance Risks",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7227643274015827)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7227643274015827",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "171",
							"name": "SA.240 - Define System Management Procedures",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.29371617863010424)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.29371617863010424",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "172",
							"name": "SA.250 - Perform Security Risk Analysis",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.13530438843992199)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.13530438843992199",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "173",
							"name": "SA : TRB Presentation",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9043997816118257)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9043997816118257",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "174",
							"name": "SA : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4914573470635779)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4914573470635779",
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
						"id": "175",
						"name": "Testing",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8256986044289901)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.8256986044289901",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "176",
							"name": "TS.010 - Define Global Tests Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7711003029600481)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7711003029600481",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "177",
							"name": "TS.020 - Develop Unit Test Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5834056165736755)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5834056165736755",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "178",
							"name": "TS.030 - Develop Integration Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9946322416104477)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9946322416104477",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "179",
							"name": "TS.040 - Develop System Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21122805771011488)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.21122805771011488",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "180",
							"name": "TS.050 - Develop Acceptance Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9314113718129291)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9314113718129291",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "181",
							"name": "TS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6245884201976036)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6245884201976036",
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
						"id": "182",
						"name": "Transfer to Production",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9232719962190244)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9232719962190244",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "183",
							"name": "TP.010 - Define Transition Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1411793933453781)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.1411793933453781",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "184",
							"name": "TP : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3225023186428625)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3225023186428625",
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
						"id": "185",
						"name": "Fit & Gap Analysis or Functional Analysis : End",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8954525571761567)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.8954525571761567",
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
					"id": "186",
					"name": "Build",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.718174913085597)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.718174913085597",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "187",
						"name": "Change Management",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6788208012763721)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.6788208012763721",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "188",
							"name": "CM.140 - Develop User Learningware",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8002628980578554)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8002628980578554",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "189",
							"name": "CM.150 - Skilled Users",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7028661910192588)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7028661910192588",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "190",
							"name": "CM.160 - Conduct Effectiveness Assessment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6709967667103173)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6709967667103173",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "191",
							"name": "CM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.554391674879566)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.554391674879566",
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
						"id": "192",
						"name": "Conception",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8616407498477159)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.8616407498477159",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "193",
							"name": "CO.230 - Plan and Apply Application Configuration (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.679092972186703)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.679092972186703",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "194",
							"name": "CO.239 - Plan Installation Routines",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4985189022192593)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4985189022192593",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "195",
							"name": "CO.240 - Plan and Apply Installation Routines",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7552757040081323)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7552757040081323",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "196",
							"name": "CO.250 - User Interface Specifications (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.44497859291125097)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.44497859291125097",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "197",
							"name": "CO.260 - Module Specifications (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.25513011963065646)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.25513011963065646",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "198",
							"name": "CO.270 - Report Specifications (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7371146528606333)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7371146528606333",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "199",
							"name": "CO.280 - Interface Specifications (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.526101422291826)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.526101422291826",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "200",
							"name": "CO.290 - Conversion Specifications (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7116714189831354)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7116714189831354",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "201",
							"name": "CO.300 - Custom Database Extensions Specifications (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3805844680248003)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3805844680248003",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "202",
							"name": "CO.310 - Install Conversion Programs",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.17426807268572342)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.17426807268572342",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "203",
							"name": "CO.320 - Convert and Verify Data",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9778841201404326)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9778841201404326",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "204",
							"name": "CO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18026225185704847)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.18026225185704847",
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
						"id": "205",
						"name": "Documentation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6905495652779687)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.6905495652779687",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "206",
							"name": "DO.060 - Publish User Reference Manual",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6919014396507317)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6919014396507317",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "207",
							"name": "DO.070 - Publish User Guide",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6805051023724796)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6805051023724796",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "208",
							"name": "DO.080 - Publish Technical Reference Manual",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5206591238139204)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5206591238139204",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "209",
							"name": "DO.090 - Publish System Management Guide",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.602593292286327)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.602593292286327",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "210",
							"name": "DO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7152635490087444)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7152635490087444",
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
						"id": "211",
						"name": "Testing",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9325004503375497)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9325004503375497",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "212",
							"name": "TS.060 - Execute Unit Test Cases (could be included in CO)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5106477005899617)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5106477005899617",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "213",
							"name": "TS.070 - Execute Integration Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7460492324241962)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7460492324241962",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "214",
							"name": "TS.080 - Execute System Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7764188428752875)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7764188428752875",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "215",
							"name": "TS.090 - Execute Acceptance Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.501848212909092)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.501848212909092",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "216",
							"name": "TS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.70058753641094)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.70058753641094",
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
						"id": "217",
						"name": "Transfer to Production",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6067139319771588)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.6067139319771588",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "218",
							"name": "TP.020 - Define Production Support Infrastructure",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.44557671367356955)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.44557671367356955",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "219",
							"name": "TP.030 - Develop Transition and Contingency Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3095263744654916)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3095263744654916",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "220",
							"name": "TP.040 - Configured Applications",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21704523621864025)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.21704523621864025",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "221",
							"name": "TP.050 - Implement Production Support Infrastructure",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9116640035732277)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9116640035732277",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "222",
							"name": "TP.060 - Verify Production Readiness",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8387580495579243)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8387580495579243",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "223",
							"name": "TP.070 - Apply Security Profiles",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.0878484278395747)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.0878484278395747",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "224",
							"name": "TP.080 - Measure System Performance",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.10514247860678139)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.10514247860678139",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "225",
							"name": "TP : GO-LIVE",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9688723193837755)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9688723193837755",
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
						"id": "226",
						"name": "Post-Implementation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9362369168279205)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9362369168279205",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "227",
							"name": "TP.090 - Maintain System",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.06810640286828729)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.06810640286828729",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "228",
							"name": "TP.100 - Refine Production System",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8211160102189851)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8211160102189851",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "229",
							"name": "TP.110 - Decommission Former Systems",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3523762658186128)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3523762658186128",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "230",
							"name": "TP : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9522085357243918)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9522085357243918",
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
						"id": "231",
						"name": "Build : End",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8908580687313903)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.8908580687313903",
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
			},
			{
				"id": "232",
				"name": "IPLC",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1624044025623156)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 08:00:00 EDT 2011",
					"duration": "0.0",
					"percentageComplete": "0.1624044025623156",
					"milestone": "false",
					"notes": "[2011-04-15 06:59:32 martfau (5028742)]\n\tUne fois copi \u00E9 dans votre projet :\n[2011-04-15 06:59:32 martfau (5028743)]\n\t-  \u00C9liminez la t\u00E2che r\u00E9capitutalive du cycle de vie \"IPLC\"\n[2011-04-15 06:59:32 martfau (5028744)]\n\t-  \u00C9liminer la t\u00E2che r\u00E9capitulative de la phase \"Fit & Gap ou ...\"\n[2011-04-15 06:59:32 martfau (5028745)]\n\t- Ne conserver que les Domaines en Niveau1\n\nAjouter une ou plusieurs nouvelles notes ici :\n"
				},
				"children": 
				[
				{
					"id": "233",
					"name": "Solution Selection or Preliminary Analysis",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.473634508793331)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.473634508793331",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "234",
						"name": "Change Management",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9684886734744873)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9684886734744873",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "235",
							"name": "CM.010 - Define Executive Project Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6429532912166216)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6429532912166216",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "236",
							"name": "CM.020 - Conduct Initial Project Team Orientation",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9724655350731815)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9724655350731815",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "237",
							"name": "CM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.28736050285953807)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.28736050285953807",
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
						"id": "238",
						"name": "Documentation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.23364674127692053)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.23364674127692053",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "239",
							"name": "DO.010 - Initial Documentation Requirements and Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.11111170500249112)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.11111170500249112",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "240",
							"name": "DO.030 - Glossary",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5007501101795022)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5007501101795022",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "241",
							"name": "DO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6248239541351901)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6248239541351901",
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
						"id": "242",
						"name": "Solution Architecture",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.017159227067973015)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.017159227067973015",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "243",
							"name": "SA.010 Define Architecture Requirements and Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7710957402574015)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7710957402574015",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "244",
							"name": "SA.020 Identify Current Technical Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9634430438666289)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9634430438666289",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "245",
							"name": "SA.030 Develop Conceptual Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5803603916592078)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5803603916592078",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "246",
							"name": "SA.050 Define Non-Functional Requirements",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2793701739456179)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.2793701739456179",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "247",
							"name": "SA : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.032318499977212256)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.032318499977212256",
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
						"id": "248",
						"name": "Testing",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.11437181747485958)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.11437181747485958",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "249",
							"name": "TS.010 - Global Test Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5037483463442599)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5037483463442599",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "250",
							"name": "TS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8655669700959457)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8655669700959457",
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
						"id": "251",
						"name": "Vendor Selection",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6753779720575084)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.6753779720575084",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "252",
							"name": "VS.010 Market Segmentation Information",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.37129699205875066)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.37129699205875066",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "253",
							"name": "VS.020 Vendor Dossier",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3274454524667766)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3274454524667766",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "254",
							"name": "VS.030 Commercial-off-the-shelf Package Dossier",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.05776347819062744)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.05776347819062744",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "255",
							"name": "VS.040 Commercial-off-the-shelf Package Screening Criteria and Rationale",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.06972429797220425)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.06972429797220425",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "256",
							"name": "VS.050 Evaluation Score Sheet",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7730435417446727)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7730435417446727",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "257",
							"name": "VS.060 Manage Request for Information",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2890813226956096)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.2890813226956096",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "258",
							"name": "VS.070 Request for Information Response",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3309736694052122)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3309736694052122",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "259",
							"name": "VS.080 Vendor and Package Evaluation Workshop Description",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4945072604387457)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4945072604387457",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "260",
							"name": "VS.090 Evaluate Vendor Scoring",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1637841272871705)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.1637841272871705",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "261",
							"name": "VS.099 Provide the Non Disclosure Agreement letter",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6581064064645784)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6581064064645784",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "262",
							"name": "VS.100 Request for Proposal issued",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.35463644245442816)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.35463644245442816",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "263",
							"name": "VS.110 Request for Proposal response",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5290493690389276)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5290493690389276",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "264",
							"name": "VS.115 Proof of concept Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.43849715918573473)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.43849715918573473",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "265",
							"name": "VS.116 Request for Proof of concept",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7345312718894255)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7345312718894255",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "266",
							"name": "VS.120 Cumulative Candidate Solution Evaluation Summary and Recommendation",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5075330616426247)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5075330616426247",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "267",
							"name": "VS.130 Contract",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3148311164428269)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3148311164428269",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "268",
							"name": "VS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7766604136074372)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7766604136074372",
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
						"id": "269",
						"name": "Solution Selection or Preliminary Analysis  : End",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9050558114525386)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9050558114525386",
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
					"id": "270",
					"name": "Fit & Gap Analysis or Functional Analysis",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3116235873984716)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.3116235873984716",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "271",
						"name": "Business Requirements",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3802450973596835)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.3802450973596835",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "272",
							"name": "BR.050 - Gather Business Scenarios",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9040151693902774)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9040151693902774",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "273",
							"name": "BR.100 - Map Business Requirements",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7397979468281782)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7397979468281782",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "274",
							"name": "BR.110 - Conduct Reporting Analysis",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.011189755731941031)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.011189755731941031",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "275",
							"name": "BR.120 - Business Mapping Test Results",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07251306218947207)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.07251306218947207",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "276",
							"name": "BR.130 - Confirm Business Solutions",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7682500099412443)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7682500099412443",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "277",
							"name": "BR : Acceptance Criteria Definition",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7526618342868232)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7526618342868232",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "278",
							"name": "BR : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.28458585845845963)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.28458585845845963",
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
						"id": "279",
						"name": "Change Management",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.713294075698748)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.713294075698748",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "280",
							"name": "CM.005 - Change Management Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8949695989936791)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8949695989936791",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "281",
							"name": "CM.030 - Develop Project Team Learning Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6204599141040564)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6204599141040564",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "282",
							"name": "CM.040 - Skilled Project Team",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7269927445637118)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7269927445637118",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "283",
							"name": "CM.060 - Develop Project Readiness Roadmap",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9370275984114829)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9370275984114829",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "284",
							"name": "CM.070 - Develop and Execute Communication Campaign",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.804436297877244)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.804436297877244",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "285",
							"name": "CM.110 - Align IT Groups",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6852369438128011)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6852369438128011",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "286",
							"name": "CM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07032859713778927)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.07032859713778927",
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
						"id": "287",
						"name": "Conception",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9606053544107244)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9606053544107244",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "288",
							"name": "CO.180 - Prepare CRP Environment or Configured Mapping Environment ???",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.31929207153127437)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.31929207153127437",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "289",
							"name": "CO.190 - Prepare Development Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.48807362322586867)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.48807362322586867",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "290",
							"name": "CO.200 - Prepare Testing Environments",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.04392020261690144)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.04392020261690144",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "291",
							"name": "CO.210 - Prepare Production Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.20550363441167208)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.20550363441167208",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "292",
							"name": "CO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2616572455810653)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.2616572455810653",
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
						"id": "293",
						"name": "Documentation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3581840552159552)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.3581840552159552",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "294",
							"name": "DO.010 - Define Documentation Requirements and Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.580962504659088)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.580962504659088",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "295",
							"name": "DO.020 - Define Documentation Standards and Procedures",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8441128352234771)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8441128352234771",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "296",
							"name": "DO.040 - Prepare Documentation Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5408248402428889)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5408248402428889",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "297",
							"name": "DO.050 - Produce Documentation Prototypes and Templates",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7243228301144783)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7243228301144783",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "298",
							"name": "DO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9941825942056675)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9941825942056675",
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
						"id": "299",
						"name": "Solution Architecture",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.37196311844530094)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.37196311844530094",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "300",
							"name": "SA.100 - Propose Technical Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.12940188434045474)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.12940188434045474",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "301",
							"name": "SA.110 - Define the Environments Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.34291970413159056)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.34291970413159056",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "302",
							"name": "SA.120 - Define Application Security Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6168618440486141)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6168618440486141",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "303",
							"name": "SA.130 - Define Application and Database Server Architecture",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9521323935651553)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9521323935651553",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "304",
							"name": "SA.140 - Define and Propose Architecture Subsystems",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2233251759679511)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.2233251759679511",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "305",
							"name": "SA.150 - Infrastructure Architecture Specification",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6450343147105442)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6450343147105442",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "306",
							"name": "SA.170 - Design CRP Environment or Configured Mapping Environment ???",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6436383553531358)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6436383553531358",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "307",
							"name": "SA.180 - Design Development Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5802066079451398)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5802066079451398",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "308",
							"name": "SA.190 - Design Testing Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9080854453937011)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9080854453937011",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "309",
							"name": "SA.200 - Design Production Environment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.41770345268989406)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.41770345268989406",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "310",
							"name": "SA.230 - Assess Performance Risks",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21168408821937246)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.21168408821937246",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "311",
							"name": "SA.240 - Define System Management Procedures",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8850579281827534)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8850579281827534",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "312",
							"name": "SA.250 - Perform Security Risk Analysis",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.29740932782001983)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.29740932782001983",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "313",
							"name": "SA : TRB Presentation",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4228975349619679)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4228975349619679",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "314",
							"name": "SA : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4980937244511001)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4980937244511001",
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
						"id": "315",
						"name": "Testing",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7204004417727068)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7204004417727068",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "316",
							"name": "TS.010 - Define Global Tests Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7789907575816772)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7789907575816772",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "317",
							"name": "TS.020 - Develop Unit Test Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1740441908512762)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.1740441908512762",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "318",
							"name": "TS.030 - Develop Integration Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9611915245531524)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9611915245531524",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "319",
							"name": "TS.040 - Develop System Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.07741382518403461)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.07741382518403461",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "320",
							"name": "TS.050 - Develop Acceptance Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9233318962779913)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9233318962779913",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "321",
							"name": "TS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.049614302562441814)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.049614302562441814",
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
						"name": "Transfer to Production",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.05971174231272025)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.05971174231272025",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "323",
							"name": "TP.010 - Define Transition Strategy",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08328058570983365)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.08328058570983365",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "324",
							"name": "TP : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7213105819781837)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7213105819781837",
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
						"id": "325",
						"name": "Fit & Gap Analysis or Functional Analysis : End",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9253353063781219)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.9253353063781219",
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
					"id": "326",
					"name": "Build",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6041085375268345)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.6041085375268345",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					{
						"id": "327",
						"name": "Change Management",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5195649841195359)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.5195649841195359",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "328",
							"name": "CM.140 - Develop User Learningware",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.001437311539977948)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.001437311539977948",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "329",
							"name": "CM.160 - Conduct Effectiveness Assessment",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.16025673214626968)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.16025673214626968",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "330",
							"name": "CM : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5240702231503387)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5240702231503387",
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
						"id": "331",
						"name": "Conception",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.623003452194109)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.623003452194109",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "332",
							"name": "CO.230 - Plan and Apply Application Configuration (to be exploded)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.39266421159196274)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.39266421159196274",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "333",
							"name": "CO.239 - Plan Installation Routines",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1976340708722395)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.1976340708722395",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "334",
							"name": "CO.240 - Plan and Apply Installation Routines",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.873115802174696)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.873115802174696",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "335",
							"name": "CO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5811881952966532)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5811881952966532",
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
						"id": "336",
						"name": "Documentation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7970268396112157)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.7970268396112157",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "337",
							"name": "DO.080 - Publish Technical Reference Manual",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4221235927297142)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4221235927297142",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "338",
							"name": "DO.090 - Publish System Management Guide",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8764641886253792)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8764641886253792",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "339",
							"name": "DO : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8721456942848287)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8721456942848287",
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
						"id": "340",
						"name": "Testing",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.20536620526727067)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.20536620526727067",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "341",
							"name": "TS.060 - Execute Unit Test Cases (could be included in CO)",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9747866437635029)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.9747866437635029",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "342",
							"name": "TS.070 - Execute Integration Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7037024380571216)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7037024380571216",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "343",
							"name": "TS.080 - Execute System Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.42337007391681747)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.42337007391681747",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "344",
							"name": "TS.090 - Execute Acceptance Test Cases",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.06631632958265055)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.06631632958265055",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "345",
							"name": "TS : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5847458613670555)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.5847458613670555",
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
						"id": "346",
						"name": "Transfer to Production",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4713657133356832)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.4713657133356832",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "347",
							"name": "TP.020 - Define Production Support Infrastructure",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.37168409822663295)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.37168409822663295",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "348",
							"name": "TP.030 - Develop Transition and Contingency Plan",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3764702731456073)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.3764702731456073",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "349",
							"name": "TP.050 - Implement Production Support Infrastructure",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.28618221037494873)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.28618221037494873",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "350",
							"name": "TP.060 - Verify Production Readiness",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.172858391364496)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.172858391364496",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "351",
							"name": "TP.080 - Measure System Performance",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.932032797794065)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.932032797794065",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "352",
							"name": "TP : GO-LIVE",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.44745461045821056)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.44745461045821056",
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
						"id": "353",
						"name": "Post-Implementation",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.20137953244266216)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.20137953244266216",
							"milestone": "false",
							"notes": ""
						},
						"children": 
						[
						{
							"id": "354",
							"name": "TP.090 - Maintain System",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7096892989075493)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.7096892989075493",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "355",
							"name": "TP.100 - Refine Production System",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8060173917011959)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.8060173917011959",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "356",
							"name": "TP.110 - Decommission Former Systems",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6791257650974776)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.6791257650974776",
								"milestone": "true",
								"notes": ""
							},
							"children": 
							[
							]
						},
						{
							"id": "357",
							"name": "TP : End",
							"data": 
							{
								"$area": 0.0,
								"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4379222235646306)),
								"priority": "500",
								"start": "Mon Apr 11 08:00:00 EDT 2011",
								"finish": "Mon Apr 11 08:00:00 EDT 2011",
								"duration": "0.0",
								"percentageComplete": "0.4379222235646306",
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
						"id": "358",
						"name": "Build : End",
						"data": 
						{
							"$area": 0.0,
							"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08141463746244915)),
							"priority": "500",
							"start": "Mon Apr 11 08:00:00 EDT 2011",
							"finish": "Mon Apr 11 08:00:00 EDT 2011",
							"duration": "0.0",
							"percentageComplete": "0.08141463746244915",
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
			},
			{
				"id": "359",
				"name": "Infrastructure",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9646966566985309)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 08:00:00 EDT 2011",
					"duration": "0.0",
					"percentageComplete": "0.9646966566985309",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "383",
					"name": "To be exploded",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6591175010375209)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.6591175010375209",
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
				"id": "360",
				"name": "Expenses",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.19897341314315486)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 08:00:00 EDT 2011",
					"duration": "0.0",
					"percentageComplete": "0.19897341314315486",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "361",
					"name": "Expenses: Resources (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5375065999706989)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.5375065999706989",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "362",
					"name": "Expenses: Resource (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6215228107501283)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.6215228107501283",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "363",
					"name": "Expenses: Software (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.3090873283253044)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.3090873283253044",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "364",
					"name": "Expenses: Software (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.02881816513533564)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.02881816513533564",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "365",
					"name": "Expenses: Hardware (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.42550891536168733)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.42550891536168733",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "366",
					"name": "Expenses: Hardware (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.288035320318089)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.288035320318089",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "367",
					"name": "Expenses: Travel (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4665881243897072)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.4665881243897072",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "368",
					"name": "Expenses: Travel (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8511686857249078)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.8511686857249078",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "369",
					"name": "Expenses: Training (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.060396281826272324)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.060396281826272324",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "370",
					"name": "Expenses: Training (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5456319888336949)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.5456319888336949",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "371",
					"name": "Expenses: Telecom (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.13243112139312485)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.13243112139312485",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "372",
					"name": "Expenses: Telecom (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8045182046448988)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.8045182046448988",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "373",
					"name": "Expenses: Other (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6276812569195348)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.6276812569195348",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "374",
					"name": "Expenses: Other (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7192882924553629)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.7192882924553629",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "375",
					"name": "Expenses: Interest (Opex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.01396779950784044)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.01396779950784044",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "376",
					"name": "Expenses: Interest (Capex)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6993920410250033)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.6993920410250033",
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
				"id": "377",
				"name": "Contingency",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.9677172532865571)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 08:00:00 EDT 2011",
					"duration": "0.0",
					"percentageComplete": "0.9677172532865571",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "378",
					"name": "Contingency 2011 (OPEX)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7593738443495925)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.7593738443495925",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "379",
					"name": "Contingency 2011 (CAPEX)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.10157059983974881)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.10157059983974881",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "380",
					"name": "Contingency 2012 (OPEX)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.01342167028906105)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.01342167028906105",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "381",
					"name": "Contingency 2012 (CAPEX)",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5816634674864868)),
						"priority": "500",
						"start": "Mon Apr 11 08:00:00 EDT 2011",
						"finish": "Mon Apr 11 08:00:00 EDT 2011",
						"duration": "0.0",
						"percentageComplete": "0.5816634674864868",
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
				"id": "382",
				"name": "Project : End",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6545400221250136)),
					"priority": "500",
					"start": "Mon Apr 11 08:00:00 EDT 2011",
					"finish": "Mon Apr 11 08:00:00 EDT 2011",
					"duration": "0.0",
					"percentageComplete": "0.6545400221250136",
					"milestone": "true",
					"notes": ""
				},
				"children": 
				[
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