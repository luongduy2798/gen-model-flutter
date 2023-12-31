const moment = require('moment');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const object = require('./object.json')
let entity = ''
rl.question('Please enter entity name: ', (name) => {
    entity += `import 'dart:convert';\nimport 'package:json_annotation/json_annotation.dart';\npart '${name.toLowerCase()}.g.dart';\n\n@JsonSerializable()\n`
    entity += `class ${name} {\n`;
    let newOb = ''
    for (let index = 0; index < Object.keys(object).length; index++) {
        const key = Object.keys(object)[index];
        const value = Object.values(object)[index];
        newOb = newOb + `this.${key},`
        switch (typeof value) {
            case 'number':
                entity += `  int? ${key};\n`
                break;
            case 'string':
                if (isDate(value))
                    entity += `  DateTime? ${key};\n`
                else
                    entity += `  String? ${key};\n`
                break;
            case 'boolean':
                entity += `  bool? ${key};\n`
                break;
            default:
                entity += `  dynamic ${key};\n`
                break;
        }
    }
    entity += `\n  ${name}({${newOb}});\n\n`
    entity += `  factory ${name}.fromJson(Map<String, dynamic> json) => _$${name}FromJson(json);\n\n`
    entity += `  Map<String, dynamic> toJson() => _$${name}ToJson(this);\n`
    entity += `}\n\n`
    entity += `List<${name}> ${name.toLowerCase()}ListFromJson(String str) => List<${name}>.from(json.decode(str).map((x) => ${name}.fromJson(x)));\n\n`
    entity += `${name} ${name.toLowerCase()}FromJson(String str) => ${name}.fromJson(json.decode(str));\n\n`
    entity += `String ${name.toLowerCase()}ToJson(${name} data) => json.encode(data.toJson());`

    console.log('=========================================');
    console.log('=========================================');
    console.log(entity);
    console.log('=========================================');
    console.log('=========================================');
    rl.close();
});

function isDate(date) {
    return moment(date, true).isValid() && new Date(date).getTime() > 0 && date.length >= 10 && (date.includes('-') || date.includes('/') || date.includes('.'))
}