conversions = [
    // ####################### Weight
    {
        name: "Pounds (lbs) to Kilograms (kg)",
        regex: "(\\d+((\\.|\\,)\\d+)?)\\s?(lb|pound)",
        flags: "i",
        conversion: (match) => { return Math.round((match[1].replace(",", '.') / 2.2046) * 100) / 100 + " kg"; }
    },
    {
        name: "Stone (st) to Kilograms (kg)",
        regex: "(\\d+((\\.|\\,)\\d+)?)\\s?(st)",
        flags: "i",
        conversion: (match) => { return Math.round((match[1].replace(",", '.') * 6.35029) * 100) / 100 + " kg"; }
    },
    // ####################### Distance
    {
        name: "Inches (in) to Centimeters (cm)",
        regex: `(\\d+((\\.|\\,)\\d+)?)\\s?(in|")`,
        flags: "i",
        conversion: (match) => { return Math.round((match[1].replace(",", '.') * 2.54) * 100) / 100 + " cm"; }
    },
    {
        name: "Feet (ft) to Centimeters (cm)",
        regex: `(\\d+((\\.|\\,)\\d+)?)\\s?(ft|foot|feet|\\')(\\d+|\\s?((\\d+((\\.|\\,)\\d+)?)\\s?(in|inch|inches|\\")))?`,
        flags: "i",
        conversion: (match) => {
            let feet = match[1] ? match[1].replace(",", '.') : 0;
            let inches = match[7] ? match[7].replace(",", '.') : 0;
            let v = feet * 30.48 + inches * 2.54;
            return v > 100 ? Math.round(v) / 100 + " m" : Math.round(v * 100) / 100 + " cm";
        }
    }, 
    {
        name: "Yards (yd) to Meters (m)",
        regex: "(\\d+((\\.|\\,)\\d+)?)\\s?(yard|yd)",
        flags: "i",
        conversion: (match) => { return Math.round((match[1].replace(",", '.') / 1.094) * 100) / 100 + " m"; }
    },
    {
        name: "Miles (mi) to Kilometers (km)",
        regex: "(\\d+((\\.|\\,)\\d+)?)\\s?(mi)",
        flags: "i",
        conversion: (match) => {
            let v = (match[1].replace(",", '.') * 1609.344);
            return v > 1000 ? Math.round(v / 10) / 100 + " km" : Math.round(v * 100) / 100 + " m";
        }
    },
    {
        name: "Nautical Miles (nmi) to Kilometers (km)",
        regex: "(\\d+((\\.|\\,)\\d+)?)\\s?(nmi|nautical mile)",
        flags: "i",
        conversion: (match) => { return Math.round((match[1].replace(",", '.') * 1.852) * 100) / 100 + " km"; }
    },
    // ####################### Speed
    {
        name: "Miles per Hour (mph) to Kilometers per Hour (kph)",
        regex: "(\\d+((\\.|\\,)\\d+)?)\\s?(mph|mi/h)",
        flags: "i",
        conversion: (match) => { return Math.round((match[1].replace(",", '.') * 1.609344) * 100) / 100 + " km/h"; }
    },
    // ####################### Volume
    {
        name: "Gallons (gal) to Liter (l)",
        regex: "(\\d+((\\.|\\,)\\d+)?)\\s?(gl|gal)",
        flags: "i",
        conversion: (match) => { return Math.round((match[1].replace(",", '.') * 3.78541) * 100) / 100 + " l"; }
    },
]

let tooltip = document.createElement('div');
tooltip.id = 'babelUnits-tooltip';
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = '#000d1c';
tooltip.style.color = 'white';
tooltip.style.padding = '5px';
tooltip.style.borderRadius = '4px';
tooltip.style.zIndex = '1000';
tooltip.style.fontSize = '12px';
document.body.appendChild(tooltip);

document.addEventListener('mouseup', function(e) {
    var selectedText = window.getSelection().toString();
    if (selectedText) {
        for (const entry of conversions) {
            const match = selectedText.match(new RegExp(entry.regex, entry.flags));
            if (match) showTooltip(entry.conversion(match));
        }
    } else {
        tooltip.style.left = `-100px`;
        tooltip.style.top = `-100px`;
    }
});

function showTooltip(text) {
    // Set the conversion text
    document.getElementById("babelUnits-tooltip").textContent = text;

    // Position the tooltip
    const selection = window.getSelection();

    // Check if there is a selection
    if (!selection.rangeCount) {
        return null;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    var x = rect.left + window.scrollX + (rect.width / 2);
    var y = rect.top + window.scrollY - tooltip.offsetHeight + 6;

    // Set the position of the tooltip
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.transform = "translate(-50%,-50%)";
}