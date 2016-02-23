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
		"name": "NewProduct.mpp",
		"data":
		{
			"$color": "#606060"
		},
		"children":
		[
			{
				"id": "2",
				"name": "Begin project",
				"data": 
				{
					"$area": 0.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6363229939668423)),
					"priority": "500",
					"start": "Mon Jul 19 08:00:00 EDT 2004",
					"finish": "Mon Jul 19 08:00:00 EDT 2004",
					"duration": "0.0",
					"percentageComplete": "0.6363229939668423",
					"milestone": "true",
					"notes": ""
				},
				"children": 
				[
				]
			},
			{
				"id": "1",
				"name": "Design Phase",
				"data": 
				{
					"$area": 55.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8463976035300501)),
					"priority": "500",
					"start": "Mon Jul 19 08:00:00 EDT 2004",
					"finish": "Fri Oct 01 17:00:00 EDT 2004",
					"duration": "55.0",
					"percentageComplete": "0.8463976035300501",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "3",
					"name": "Prototype design",
					"data": 
					{
						"$area": 25.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5355690198090519)),
						"priority": "500",
						"start": "Mon Jul 19 08:00:00 EDT 2004",
						"finish": "Fri Aug 20 17:00:00 EDT 2004",
						"duration": "25.0",
						"percentageComplete": "0.5355690198090519",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "4",
					"name": "Test prototype",
					"data": 
					{
						"$area": 20.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.23081612344859714)),
						"priority": "500",
						"start": "Mon Sep 06 08:00:00 EDT 2004",
						"finish": "Fri Oct 01 17:00:00 EDT 2004",
						"duration": "20.0",
						"percentageComplete": "0.23081612344859714",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "5",
					"name": "Prototype completed",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.0110179229305295)),
						"priority": "500",
						"start": "Fri Oct 01 17:00:00 EDT 2004",
						"finish": "Fri Oct 01 17:00:00 EDT 2004",
						"duration": "0.0",
						"percentageComplete": "0.0110179229305295",
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
				"id": "6",
				"name": "Finance Phase",
				"data": 
				{
					"$area": 45.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2030474319595631)),
					"priority": "500",
					"start": "Mon Jul 19 08:00:00 EDT 2004",
					"finish": "Fri Sep 17 17:00:00 EDT 2004",
					"duration": "45.0",
					"percentageComplete": "0.2030474319595631",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "7",
					"name": "Create business plan",
					"data": 
					{
						"$area": 3.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.08407563495139991)),
						"priority": "500",
						"start": "Mon Jul 19 08:00:00 EDT 2004",
						"finish": "Fri Aug 06 17:00:00 EDT 2004",
						"duration": "3.0",
						"percentageComplete": "0.08407563495139991",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "8",
					"name": "Present to current investors",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6208025283889742)),
						"priority": "500",
						"start": "Fri Aug 06 17:00:00 EDT 2004",
						"finish": "Fri Aug 06 17:00:00 EDT 2004",
						"duration": "0.0",
						"percentageComplete": "0.6208025283889742",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "9",
					"name": "Meet with bankers",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5167268529112832)),
						"priority": "500",
						"start": "Fri Aug 06 17:00:00 EDT 2004",
						"finish": "Fri Aug 06 17:00:00 EDT 2004",
						"duration": "0.0",
						"percentageComplete": "0.5167268529112832",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "10",
					"name": "Circulate plan w/ venture capitalists",
					"data": 
					{
						"$area": 5.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.39159179550946654)),
						"priority": "500",
						"start": "Mon Aug 09 08:00:00 EDT 2004",
						"finish": "Fri Aug 13 17:00:00 EDT 2004",
						"duration": "5.0",
						"percentageComplete": "0.39159179550946654",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "11",
					"name": "Negotiate with venture capitalists",
					"data": 
					{
						"$area": 2.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7665103190941942)),
						"priority": "500",
						"start": "Mon Aug 16 08:00:00 EDT 2004",
						"finish": "Fri Aug 27 17:00:00 EDT 2004",
						"duration": "2.0",
						"percentageComplete": "0.7665103190941942",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "12",
					"name": "Reach agreement",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15467145489317236)),
						"priority": "500",
						"start": "Fri Aug 27 17:00:00 EDT 2004",
						"finish": "Fri Aug 27 17:00:00 EDT 2004",
						"duration": "0.0",
						"percentageComplete": "0.15467145489317236",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "13",
					"name": "Create legal documentation",
					"data": 
					{
						"$area": 3.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8042268689432938)),
						"priority": "500",
						"start": "Mon Aug 30 08:00:00 EDT 2004",
						"finish": "Fri Sep 17 17:00:00 EDT 2004",
						"duration": "3.0",
						"percentageComplete": "0.8042268689432938",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "14",
					"name": "Financing closed",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.18610710420627286)),
						"priority": "500",
						"start": "Fri Sep 17 17:00:00 EDT 2004",
						"finish": "Fri Sep 17 17:00:00 EDT 2004",
						"duration": "0.0",
						"percentageComplete": "0.18610710420627286",
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
				"id": "15",
				"name": "Production Phase",
				"data": 
				{
					"$area": 73.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5777821381697873)),
					"priority": "500",
					"start": "Mon Aug 16 08:00:00 EDT 2004",
					"finish": "Wed Nov 24 17:00:00 EST 2004",
					"duration": "73.0",
					"percentageComplete": "0.5777821381697873",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "16",
					"name": "Setup assembly line",
					"data": 
					{
						"$area": 15.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5332692189017975)),
						"priority": "500",
						"start": "Mon Oct 04 08:00:00 EDT 2004",
						"finish": "Fri Oct 22 17:00:00 EDT 2004",
						"duration": "15.0",
						"percentageComplete": "0.5332692189017975",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "17",
					"name": "Hire assemblers",
					"data": 
					{
						"$area": 50.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1962388839498661)),
						"priority": "500",
						"start": "Mon Aug 16 08:00:00 EDT 2004",
						"finish": "Fri Oct 22 17:00:00 EDT 2004",
						"duration": "50.0",
						"percentageComplete": "0.1962388839498661",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "18",
					"name": "Assemble first batch",
					"data": 
					{
						"$area": 3.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.2514767995394912)),
						"priority": "500",
						"start": "Mon Oct 25 08:00:00 EDT 2004",
						"finish": "Wed Oct 27 17:00:00 EDT 2004",
						"duration": "3.0",
						"percentageComplete": "0.2514767995394912",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "19",
					"name": "Quality testing",
					"data": 
					{
						"$area": 2.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6532693397292455)),
						"priority": "500",
						"start": "Thu Oct 28 08:00:00 EDT 2004",
						"finish": "Wed Nov 10 17:00:00 EST 2004",
						"duration": "2.0",
						"percentageComplete": "0.6532693397292455",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "20",
					"name": "Assemble product",
					"data": 
					{
						"$area": 2.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6554947821028034)),
						"priority": "500",
						"start": "Thu Nov 11 08:00:00 EST 2004",
						"finish": "Wed Nov 24 17:00:00 EST 2004",
						"duration": "2.0",
						"percentageComplete": "0.6554947821028034",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "21",
					"name": "Inventory available",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.26923230485796035)),
						"priority": "500",
						"start": "Wed Nov 24 17:00:00 EST 2004",
						"finish": "Wed Nov 24 17:00:00 EST 2004",
						"duration": "0.0",
						"percentageComplete": "0.26923230485796035",
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
				"id": "22",
				"name": "Marketing and Sales Phase",
				"data": 
				{
					"$area": 30.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8407256716800072)),
					"priority": "500",
					"start": "Mon Sep 20 08:00:00 EDT 2004",
					"finish": "Fri Oct 29 17:00:00 EDT 2004",
					"duration": "30.0",
					"percentageComplete": "0.8407256716800072",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "23",
					"name": "Develop marketing plan",
					"data": 
					{
						"$area": 1.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.8277958541238717)),
						"priority": "500",
						"start": "Mon Sep 20 08:00:00 EDT 2004",
						"finish": "Fri Sep 24 17:00:00 EDT 2004",
						"duration": "1.0",
						"percentageComplete": "0.8277958541238717",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "24",
					"name": "Create sales materials",
					"data": 
					{
						"$area": 5.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.24053987029896629)),
						"priority": "500",
						"start": "Mon Sep 27 08:00:00 EDT 2004",
						"finish": "Fri Oct 29 17:00:00 EDT 2004",
						"duration": "5.0",
						"percentageComplete": "0.24053987029896629",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "25",
					"name": "Create advertising plan",
					"data": 
					{
						"$area": 3.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.049852062081456094)),
						"priority": "500",
						"start": "Mon Sep 27 08:00:00 EDT 2004",
						"finish": "Fri Oct 15 17:00:00 EDT 2004",
						"duration": "3.0",
						"percentageComplete": "0.049852062081456094",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "26",
					"name": "Develop PR plan",
					"data": 
					{
						"$area": 15.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.13769413542562947)),
						"priority": "500",
						"start": "Mon Sep 27 08:00:00 EDT 2004",
						"finish": "Fri Oct 15 17:00:00 EDT 2004",
						"duration": "15.0",
						"percentageComplete": "0.13769413542562947",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "27",
					"name": "Sales training",
					"data": 
					{
						"$area": 3.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6490455295137704)),
						"priority": "500",
						"start": "Mon Oct 11 08:00:00 EDT 2004",
						"finish": "Fri Oct 29 17:00:00 EDT 2004",
						"duration": "3.0",
						"percentageComplete": "0.6490455295137704",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "28",
					"name": "Start sales program",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.21675736083867958)),
						"priority": "500",
						"start": "Fri Oct 29 17:00:00 EDT 2004",
						"finish": "Fri Oct 29 17:00:00 EDT 2004",
						"duration": "0.0",
						"percentageComplete": "0.21675736083867958",
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
				"name": "Distribution Phase",
				"data": 
				{
					"$area": 16.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7126452836719316)),
					"priority": "500",
					"start": "Thu Nov 25 08:00:00 EST 2004",
					"finish": "Thu Dec 16 17:00:00 EST 2004",
					"duration": "16.0",
					"percentageComplete": "0.7126452836719316",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "30",
					"name": "Stock warehouse",
					"data": 
					{
						"$area": 7.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.24407717805525608)),
						"priority": "500",
						"start": "Thu Nov 25 08:00:00 EST 2004",
						"finish": "Fri Dec 03 17:00:00 EST 2004",
						"duration": "7.0",
						"percentageComplete": "0.24407717805525608",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "31",
					"name": "Process orders",
					"data": 
					{
						"$area": 1.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.33730955839684595)),
						"priority": "500",
						"start": "Mon Dec 06 08:00:00 EST 2004",
						"finish": "Fri Dec 10 17:00:00 EST 2004",
						"duration": "1.0",
						"percentageComplete": "0.33730955839684595",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "32",
					"name": "Organize shipments",
					"data": 
					{
						"$area": 5.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.48388616005285945)),
						"priority": "500",
						"start": "Mon Dec 06 08:00:00 EST 2004",
						"finish": "Fri Dec 10 17:00:00 EST 2004",
						"duration": "5.0",
						"percentageComplete": "0.48388616005285945",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "33",
					"name": "Load trucks",
					"data": 
					{
						"$area": 4.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15581356177076633)),
						"priority": "500",
						"start": "Mon Dec 13 08:00:00 EST 2004",
						"finish": "Thu Dec 16 17:00:00 EST 2004",
						"duration": "4.0",
						"percentageComplete": "0.15581356177076633",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "34",
					"name": "First shipment",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.6179362718824452)),
						"priority": "500",
						"start": "Thu Dec 16 17:00:00 EST 2004",
						"finish": "Thu Dec 16 17:00:00 EST 2004",
						"duration": "0.0",
						"percentageComplete": "0.6179362718824452",
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
				"id": "35",
				"name": "Regional Promotions",
				"data": 
				{
					"$area": 20.0,
					"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.15215027454378816)),
					"priority": "500",
					"start": "Wed Nov 24 17:00:00 EST 2004",
					"finish": "Wed Dec 22 17:00:00 EST 2004",
					"duration": "20.0",
					"percentageComplete": "0.15215027454378816",
					"milestone": "false",
					"notes": ""
				},
				"children": 
				[
				{
					"id": "36",
					"name": "PR announcement event",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.43327323109674143)),
						"priority": "500",
						"start": "Wed Nov 24 17:00:00 EST 2004",
						"finish": "Wed Nov 24 17:00:00 EST 2004",
						"duration": "0.0",
						"percentageComplete": "0.43327323109674143",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "37",
					"name": "Begin advertising campaign",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.5130319689501902)),
						"priority": "500",
						"start": "Wed Nov 24 17:00:00 EST 2004",
						"finish": "Wed Nov 24 17:00:00 EST 2004",
						"duration": "0.0",
						"percentageComplete": "0.5130319689501902",
						"milestone": "true",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "38",
					"name": "West Coast promo week",
					"data": 
					{
						"$area": 5.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.45026629069144863)),
						"priority": "500",
						"start": "Thu Nov 25 08:00:00 EST 2004",
						"finish": "Wed Dec 01 17:00:00 EST 2004",
						"duration": "5.0",
						"percentageComplete": "0.45026629069144863",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "39",
					"name": "East Coast promo week",
					"data": 
					{
						"$area": 5.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.1381035138871839)),
						"priority": "500",
						"start": "Thu Dec 02 08:00:00 EST 2004",
						"finish": "Wed Dec 08 17:00:00 EST 2004",
						"duration": "5.0",
						"percentageComplete": "0.1381035138871839",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "40",
					"name": "Northern Region promo week",
					"data": 
					{
						"$area": 5.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7894166399772493)),
						"priority": "500",
						"start": "Thu Dec 09 08:00:00 EST 2004",
						"finish": "Wed Dec 15 17:00:00 EST 2004",
						"duration": "5.0",
						"percentageComplete": "0.7894166399772493",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "41",
					"name": "Southern Region promo week",
					"data": 
					{
						"$area": 5.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.4716664195035105)),
						"priority": "500",
						"start": "Thu Dec 16 08:00:00 EST 2004",
						"finish": "Wed Dec 22 17:00:00 EST 2004",
						"duration": "5.0",
						"percentageComplete": "0.4716664195035105",
						"milestone": "false",
						"notes": ""
					},
					"children": 
					[
					]
				},
				{
					"id": "42",
					"name": "End project",
					"data": 
					{
						"$area": 0.0,
						"$color": ColorToHex(ColorBlend(colorCold, colorWarm, 0.7409183481964355)),
						"priority": "500",
						"start": "Wed Dec 22 17:00:00 EST 2004",
						"finish": "Wed Dec 22 17:00:00 EST 2004",
						"duration": "0.0",
						"percentageComplete": "0.7409183481964355",
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