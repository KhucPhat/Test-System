function processJsonString(jsonString) {
    try {
        const obj = JSON.parse(jsonString);
        let result = [];
        console.log("Starting to extract key-value pairs from JSON:");
        extractKeyValuePairs(obj, result);
        console.log("Extraction complete.");
        return result;
    } catch (e) {
        console.error("Error parsing JSON:", e);
        return [];
    }
}

function extractKeyValuePairs(obj, result) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
                extractKeyValuePairs(value, result);
            } else if (typeof value === 'string') {
                try {
                    const nestedObj = JSON.parse(value);
                    if (typeof nestedObj === 'object' && nestedObj !== null) {
                        console.log(`Found nested JSON in key '${key}':`);
                        extractKeyValuePairs(nestedObj, result);
                    } else {
                        result.push({ key, value });
                    }
                } catch (e) {
                    result.push({ key, value });
                }
            } else {
                result.push({ key, value });
            }
        }
    }
}

const keyValueArray = processJsonString(exampleJson);
console.log(keyValueArray);

