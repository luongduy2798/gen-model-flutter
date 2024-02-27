import 'dart:convert';
import 'package:json_annotation/json_annotation.dart';
part 'account.g.dart';

@JsonSerializable()
class Account {
  int? id;
  String? userId;
  String? userPhone;
  String? status;
  DateTime? dispatchedAt;
  String? dispatchCustomerCode;
  String? dispatchId;
  int? dispatchCount;
  String? state;
  String? departureAddress;
  dynamic departureAddressDetail;
  String? departureCode;
  String? departureName;
  String? departureTel;
  String? departurePhone;
  String? arrivalAddress;
  dynamic arrivalAddressDetail;
  dynamic arrivalCode;
  String? arrivalName;
  String? arrivalTel;
  String? arrivalPhone;
  bool? isCanceled;
  dynamic canceledAt;
  dynamic canceledBy;
  dynamic cancelDescription;
  dynamic remark;
  DateTime? createdAt;
  dynamic createdBy;
  String? trackingId;

  Account({this.id,this.userId,this.userPhone,this.status,this.dispatchedAt,this.dispatchCustomerCode,this.dispatchId,this.dispatchCount,this.state,this.departureAddress,this.departureAddressDetail,this.departureCode,this.departureName,this.departureTel,this.departurePhone,this.arrivalAddress,this.arrivalAddressDetail,this.arrivalCode,this.arrivalName,this.arrivalTel,this.arrivalPhone,this.isCanceled,this.canceledAt,this.canceledBy,this.cancelDescription,this.remark,this.createdAt,this.createdBy,this.trackingId,});

  factory Account.fromJson(Map<String, dynamic> json) => _$AccountFromJson(json);

  Map<String, dynamic> toJson() => _$AccountToJson(this);
}

List<Account> accountListFromJson(String str) => List<Account>.from(json.decode(str).map((x) => Account.fromJson(x)));

Account accountFromJson(String str) => Account.fromJson(json.decode(str));

String accountToJson(Account data) => json.encode(data.toJson());