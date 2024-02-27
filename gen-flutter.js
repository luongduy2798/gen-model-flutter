const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const object = require("./object.json");
let entity = "";
rl.question("Please enter entity name: ", (name) => {
  entity += `import 'dart:convert';\nimport 'package:json_annotation/json_annotation.dart';\npart '${name.toLowerCase()}.g.dart';\n\n@JsonSerializable()\n`;
  entity += `class ${capitalizeFirstLetter(name)} {\n`;
  let newOb = "";
  for (let index = 0; index < Object.keys(object).length; index++) {
    const key = Object.keys(object)[index];
    const value = Object.values(object)[index];
    newOb = newOb + `this.${key},`;
    switch (typeof value) {
      case "number":
        entity += `  int? ${key};\n`;
        break;
      case "string":
        if (!isNaN(Date.parse(value))) entity += `  DateTime? ${key};\n`;
        else entity += `  String? ${key};\n`;
        break;
      case "boolean":
        entity += `  bool? ${key};\n`;
        break;
      default:
        entity += `  dynamic ${key};\n`;
        break;
    }
  }
  entity += `\n  ${capitalizeFirstLetter(name)}({${newOb}});\n\n`;
  entity += `  factory ${capitalizeFirstLetter(
    name
  )}.fromJson(Map<String, dynamic> json) => _$${capitalizeFirstLetter(
    name
  )}FromJson(json);\n\n`;
  entity += `  Map<String, dynamic> toJson() => _$${capitalizeFirstLetter(
    name
  )}ToJson(this);\n`;
  entity += `}\n\n`;
  entity += `List<${capitalizeFirstLetter(
    name
  )}> ${name.toLowerCase()}ListFromJson(String str) => List<${capitalizeFirstLetter(
    name
  )}>.from(json.decode(str).map((x) => ${capitalizeFirstLetter(
    name
  )}.fromJson(x)));\n\n`;
  entity += `${capitalizeFirstLetter(
    name
  )} ${name.toLowerCase()}FromJson(String str) => ${capitalizeFirstLetter(
    name
  )}.fromJson(json.decode(str));\n\n`;
  entity += `String ${name.toLowerCase()}ToJson(${capitalizeFirstLetter(
    name
  )} data) => json.encode(data.toJson());`;

  //   console.log("=========================================");
  //   console.log("=========================================");
  //   console.log(entity);
  //   console.log("=========================================");
  //   console.log("=========================================");
  fs.writeFile(`./model/${name.toLowerCase()}.dart`, entity, (err) => {});
  rl.close();
});

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
