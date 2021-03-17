interface ErrorObjI {
	[key: number]: string;
}

export const errors: ErrorObjI = {
	1000: 'API is under maintenance, please try again in a couple of minutes.',
	1001: 'Account not found. (It may also mean that input parameter "clientCode" is missing.)',
	1002: 'Hourly request quota (by default 2000 requests) has been exceeded for this account. Please resume next hour.',
	1003: 'Cannot connect to account database.',
	1005: 'API call name (input parameter "request") not specified, or unknown API call.',
	1006: 'This API call is not available on this account. (Account needs upgrading, or an extra module needs to be installed.)',
	1007: 'Unknown output format requested; input parameter "responseType" must be set to either "JSON" or "XML".',
	1008: 'Either a) database is under regular maintenance (please try again in a couple of minutes), or b) your application is not connecting to the correct API server. Make sure that you are using correct API URL: https://YOURCUSTOMERCODE.erply.com/api/. If your API URL is correct, it might be that your ERPLY account has been recently transferred between hosting environments and your local DNS cache is out of date (domain name YOURCUSTOMERCODE.erply.com is not being resolved to correct web server). Try flushing DNS cache in your computer, server, or application engine.',
	1009: 'This API call requires authentication parameters (a session key, authentication key, or service key), but none were found.',
	1010: 'Required parameters are missing. (Attribute "errorField" indicates the missing input parameter.)',
	1011: 'Invalid classifier ID, there is no such item. (Attribute "errorField" indicates the invalid input parameter.)',
	1012: 'A parameter must have a unique value. (Attribute "errorField" indicates the invalid input parameter.)',
	1013: 'Inconsistent parameter set (for example, both product and service IDs specified for an invoice row).',
	1014: 'Incorrect data type or format. (Attribute "errorField" indicates the invalid input parameter.)',
	1015: 'Malformed request (eg. parameters containing invalid characters).',
	1016: 'Invalid value. (Attribute "errorField" indicates the field that contains an invalid value.)',
	1017: 'Document has been confirmed and its contents and warehouse ID cannot be edited any more.',
	1018: 'Multiple matches found, all have the same attribute value. No records will be updated.',
	1019: 'No records found with this attribute value.',
	1020: 'Bulk API call contained more than 100 sub-requests (max 100 allowed). The whole request has been ignored.',
	1021: 'Another instance of the same report is currently running. Please wait and try again in a minute. (For long-running reports, API processes incoming requests only one at a time.)',
	1022: 'This item cannot be deleted because there are other records that reference it.',
	1023: 'Request has product rows in wrong order, or some rows are missing. When editing a confirmed Inventory Registration, only prices can be updated (not quantities and product IDs), and the request must include all rows.',
	1024: '"Master List" functionality has been activated - products cannot be added directly to the product catalog.',
	1025: 'This bin cannot be archived because it has quantities in it.',
	1026: 'An identical record already exists.',
	1027: 'On an existing record, it is not allowed to change the value of this field.',
	1028: 'This input field in this API call cannot be used. (Account needs upgrading, or an extra module needs to be installed.)',
	1029: 'One or more values in a comma-separated list are incorrect.',
	1030: 'Input parameter must not be an array. (Attribute "errorField" indicates the invalid input parameter.)',
	1040: 'Invalid coupon identifier - such coupon has not been issued.',
	1041: 'Invalid coupon identifier - this coupon has already been redeemed.',
	1042: 'Customer does not have enough reward points.',
	1043: 'Employee already has an appointment on that time slot. Please choose a different start and end time for appointment.',
	1044: 'Default length for this service has not been defined in Erply backend - cannot suggest possible time slots.',
	1045: 'Invalid coupon identifier - this coupon has expired.',
	1046: 'Sales Promotion - The promotion contains multiple conflicting requirements or conditions, please specify only one.',
	1047: 'Sales Promotion - Promotion requirements or conditions not specified.',
	1048: 'Sales Promotion - The promotion contains multiple conflicting awards, please specify only one.',
	1049: 'Sales Promotion - Promotion awards not specified.',
	1050: 'Username/password missing.',
	1051: 'Login failed.',
	1052: 'User has been temporarily blocked because of repeated unsuccessful login attempts.',
	1053: 'No password has been set for this user, therefore the user cannot be logged in.',
	1054: 'API session has expired. Please call API "verifyUser" again (with correct credentials) to receive a new session key.',
	1055: 'Supplied session key is invalid; session not found.',
	1056: 'Supplied session key is too old. User switching is no longer possible with this session key, please perform a full re-authentication via API "verifyUser".',
	1057: 'Your time-limited demo account has expired. Please create a new ERPLY demo account, or sign up for a paid account.',
	1058: 'PIN login is not supported. Provide a user name and password instead, or use the "switchUser" API call.',
	1059: 'Unable to detect your user group.',
	1060: 'No viewing rights (in this module/for this item).',
	1061: 'No adding rights (in this module).',
	1062: 'No editing rights (in this module/for this item).',
	1063: 'No deleting rights (in this module/for this item).',
	1064: 'User does not have access to this location (store, warehouse).',
	1065: 'This user account does not have API access. (It may be limited to POS or Erply backend operations only.)',
	1066: 'This user does not have the right to manage specified user group. (Error may occur when attempting to create a new user, or modify an existing one.)',
	1067: 'This account does not belong to a franchise and this API call cannot be used.',
	1068: 'This user cannot yet log in to Erply. A confirmation email has been sent; user needs to click a link in that email to verify their address.',
	1071: 'This customer can buy for a full up-front payment only.',
	1072: 'This customer does not earn new reward points.',
	1073: 'It is not possible to create an invoice from these source documents. All source documents must have the same type and same client (or the same payer).',
	1074: 'Source document cannot be an invoice, invoice-waybill, POS receipt or a credit invoice.',
	1075: 'Tax already has more than one component of this type, you must use saveVatRateComponent to add or change tax components. (Attribute "errorField" indicates the invalid input parameter.)',
	1076: 'Sales Promotion - Only promotions with type "manual" can be set to require managers approval.',
	1077: 'This price list is not associated with this store region.',
	1078: 'The "amount" field for price list items can be used only if the "Quantity Price Lists" module has been enabled on your account.',
	1079: 'When editing a price list item, product ID can not be changed.',
	1080: 'Printing service is not running at the moment. (User can turn printing service on from their Erply account).',
	1081: 'Email sending failed.',
	1082: '(error code no longer in use)',
	1083: '"Master List" functionality has not been fully set up yet, some requirements are missing.',
	1084: 'Configuration parameter "master_list_unique_field" has been incorrectly set up.',
	1085: 'Compiling the email attachment (attaching sales or purchase document PDF) failed. Please try again later.',
	1086: 'No sender address was specified and Erply was not able to fall back to a default value, either — employee email or company email has not been specified.',
	1087: 'No email body text was specified and Erply was not able to fall back to a default value, either — default message body has not been specified in back office, "Settings" > "Configuration".',
	1090: 'No file attached.',
	1091: 'Attached file is not encoded with Base64.',
	1092: 'Attached file exceeds allowed size limit.',
	1100: 'New password must contain at least 8 characters.',
	1101: 'New password may only contain Latin letters and digits. (This rule is enforced by configuration parameter "password_only_alphanumeric_allowed").',
	1102: 'New password must contain at least one small letter, one capital letter and one digit.',
	1103: 'A configuration setting does not allow the user to change own password more often than once every N days.',
	1110: 'Sales Promotion - Multiple conflicting settings. A promotion must apply to all stores, or specific regions only, or specific location only, or specific store group only.',
	1111: 'Sales Promotion - Fields "purchasedProductGroupID", "purchasedProductCategoryID" or "purchasedProducts" are only allowed together with "purchasedAmount".',
	1112: 'Sales Promotion - Multiple conflicting purchase options ("purchasedProductGroupID", "purchasedProductCategoryID" or "purchasedProducts") have been specified at the same time.',
	1113: 'Sales Promotion - Fields "awardedProductGroupID", "awardedProductCategoryID", "awardedProducts", "awardedAmount" are only allowed together with "sumOFF" or "percentageOFF".',
	1114: 'Sales Promotion - Multiple conflicting award options ("awardedProductGroupID", "awardedProductCategoryID", or "awardedProducts",) have been specified at the same time.',
	1115: 'Sales Promotion - Fields "percentageOffExcludedProducts" and "percentageOffIncludedProducts" are only allowed together with "percentageOffEntirePurchase".',
	1116: 'Sales Promotion - Fields "sumOffExcludedProducts" and "sumOffIncludedProducts" are only allowed together with "sumOffEntirePurchase".',
	1117: 'Sales Promotion - Fields "priceAtLeast" and "priceAtMost" are only allowed together with "purchasedAmount".',
	1118: 'Sales Promotion - Field "maximumPointsDiscount" can only be used together with "rewardPoints" and "sumOffEntirePurchase".',
	1119: 'Sales Promotion - Field "lowestPriceItemIsAwarded" can only be used together with "sumOFF" or "percentageOFF".',
	1120: 'This account uses customer registry microservice. The list of customers, their groups and addresses is stored outside of ERPLY. Queries and updates must be sent directly to the service, using the services own API. See the output of verifyUser for a service endpoint and authentication token.',
	1121: 'The type of a confirmed document cannot be changed.',
	1122: 'Sales Promotion - Field "specialPrice" can only be used together with "purchasedAmount".',
	1123: 'Sales Promotion - Fields "percentageOffMatchingItems" and "sumOffMatchingItems" are only allowed together with "purchasedAmount".',
	1124: 'Sales Document - For creating recurring billing invoices over API, the data model of your account needs an update. Please contact customer support.',
	1126: 'This account uses customer registry microservice. This input field in this API call cannot be used; this is a limitation of the integration.',
	1127: 'This account uses customer registry microservice. This input field in this API call is not allowed to have that value; this is a limitation of the integration.',
	1128: 'This field can only be used on Greek accounts.',
	1129: 'Sales Promotion - Flag "excludeDiscountedFromPercentageOffEntirePurchase" can only be set to 1 if you have specified "percentageOffEntirePurchase".',
	1130: 'Sales Document - One or more billing readings on that row are not associated with the specified billing statement or are already associated with another invoice.',
	1131: 'Sales Promotion - The purpose of the Reason Code must be "PROMOTION".',
	1132: 'Sales Promotion - Field "purchasedProductSubsidies" can only be used together with "purchasedProducts" and ("percentageOffMatchingItems" or "sumOffMatchingItems").',
	1133: 'Sales Promotion - Field "purchasedProductSubsidies" must contain exactly the same number of elements as field "purchasedProducts".',
	1134: 'Sales Promotion - Field "awardedProductSubsidies" must contain exactly the same number of elements as field "awardedProducts".',
	1136: 'This location does not have an assortment.',
	1137: 'This locations assortment contains more than 10,000 products; API is not going to return the list.',
	1138: 'The number of billing statement IDs must not exceed 500.',
	1139: 'Sales Promotion - Field "specialUnitPrice" can only be used together with "purchasedAmount".',
	1140: 'Sales Promotion - Field "maxItemsWithSpecialUnitPrice" must be equal to or larger than "purchasedAmount".',
	1141: 'Sales Promotion - Field "purchasedAmount" can only be used together with "purchasedProductGroupID", "purchasedProductCategoryID", or "purchasedProducts".',
	1142: 'This account uses coupon registry microservice and this API call is not supported.',
	1143: 'This account uses coupon registry microservice. This input field in this API call is not allowed to have that value; this is a limitation of the integration.',
	1144: 'Sales Promotion - Field "redemptionLimit" is not allowed for promotions that give % off entire invoice, require reward points or apply to an unlimited number of items.',
	1145: 'Sales Promotion - Field "redemptionLimit" can only be used together with "maxItemsWithSpecialUnitPrice" (for special unit price promotions).',
	1146: 'You do not have an employee record. Please ask a manager to create an employee record for you.',
	1147: 'You have already confirmed your compliance with the General Data Protection Regulation.',
	1148: 'You do not have access to customer data. Please contact your manager to receive an introduction to the General Data Protection Regulation, to get instructions about proper data protection procedures and to confirm that you will comply with them.',
	1149: 'Your account country is a non-EU country and the GDPR customer data processing log is not available. (Should you need the logging feature regardless, please let us know.)',
	1150: 'If you attempt to add a integration-specific field to a payment, you also need to set input parameter "paymentServiceProvider". See the documentation of savePayment to find out what should be the appropriate input value for "paymentServiceProvider".',
	1151: 'This product cannot be added to store price list. It already occurs in a Flyer or Managers Special price list that is active during the same time period.',
	1152: 'This store price list cannot be updated. After the update, the price list would overlap with one or more Flyer or Managers Special price lists that contain the same products.',
	1153: 'Inventory Registration - The purpose of the Reason Code must be "REGISTRATION".',
	1154: 'This API call does not support the old inventory module. Please contact customer support to upgrade your inventory.',
	1155: 'Creating a new account is temporarily not possible. Please try again in 5 minutes.',
	1156: 'Value must not be longer than 100 characters. (Attribute "errorField" indicates the invalid input parameter.)',
	1157: 'This sub-request in a bulk call cannot be executed. It refers to the special value "CURRENT_INVOICE_ID", but the preceding "saveSalesDocument" call returned an error code and no document was created.',
	1158: 'This sub-request in a bulk call cannot be executed. It refers to the special value "CURRENT_INVOICE_ID", but the preceding "saveSalesDocument" call was flagged as a duplicate and no document was created.',
	1159: 'This field can only be used on EU accounts.',
	1160: 'The "giftCardVatRateID" field for a payment can be used only if the payments type is "GIFTCARD".',
	1161: 'This request is specific to POS applications, and cannot be called by other API clients.',
	1162: 'Provided list of elements is too long. (Attribute "errorField" indicates the invalid input parameter, documentation of exact call contains information about size limits.)',
	1170: 'Customer code (clientCode) is missing from Json Web Token.',
	1171: 'User doesnt have rights for Back Office. Access to Back Office can be granted in Identity.',
	1172: 'Username is missing from Json Web Token.',
	1173: 'There is no such username in Erply.',
	1174: 'This user exists but is in "pending" status. Manager has to add this user to a user group.',
	1175: 'A user with this username already exists. Cannot create a new user with this username.',
	1176: 'This is a JWT-based session and therefore Erply does not have the authority to extend or delegate the session.',
	1177: 'createInstallation() - New signup are not allowed for provided country.',
	1178: 'This contact person cannot be used because they are another customers contact.',
	1179: 'addInvoiceAlgorithmChange() - The "date" parameter must specify a future date.',
	1180: 'addInvoiceAlgorithmChange() - Provided version number is not allowed for this account.',
	1181: 'Provided stocktaking is already confirmed.',
	1182: 'Sales Promotion - Flag "excludePromotionItemsFromPercentageOffEntirePurchase" can only be set to 1 if you have specified "percentageOffEntirePurchase".',
	1183: 'CDN integration has been enabled. This request should be done against CDN API.',
	1184: 'Sales Promotion - Field "maximumNumberOfMatchingItems" can only be used together with "percentageOffMatchingItems" or "sumOffMatchingItems".',
	1185: 'Sales Promotion - Field "maximumNumberOfMatchingItems" must be equal to or larger than "purchasedAmount".',
	1186: 'Inventory Registration, Inventory Write-Off - Provided Inventory Stocktaking is already connected to document of such type.',
	1187: 'Configuration related to this call is missing, check calls documentation.',
	1188: 'Configuration related to this call is invalid, check calls documentation.',
	1189: 'POS Store Quick Buttons - Provided warehouse doesnt have local quick buttons enabled.',
	1190: 'Account in the given JWT is not valid for this request. This means that the token was generated for a different account than the request was made for.',
	1191: 'JWT decoding failed. This means that the provided token is in incorrect format or decoding failed due to invalid fingerprints.',
	1194: 'JWT expired. The used JWT ttl has passed and cannot be used.',
	1195: 'This language code is not supported.',
	1196: 'New password has already been used in the past. Password history checks feature has been enabled on this account.',
	1197: 'Sales Promotion - Only one of the following one time options can be active at the same time: use only once, use once a day and on birthday',
	1198: 'Sales Promotion - Cannot enable once per birthday when the is birthday promotion option is disabled.',
	1199: 'Sales Promotion - "onlyForDiscountedItems" flag is set to true on this promotion. This can only be set on a promotion that follows the "% or $ off specific items" rule formula. Disable the flag or adjust the rule.',
	1200: 'Sales Promotion - Field "redemptionLimit" can only be used together with "maximumNumberOfMatchingItems" (for multi-buy promotions).',
	1201: 'IP whitelisting feature has been enabled. The request is made from an IP that is not allowed to use the API.',
	1202: 'This user is considered an administrator. For administrators, there is a minimum required password length specified in account configuration; this password is shorter than that.',
	1203: 'This user is considered an administrator. Administrator’s password must contain at least one special character.',
	1204: 'The document you are trying to update is already being processed. This means that the same document received more than 1 concurrent requests. Try again in a few minutes.',
	1205: 'The request has exceeded maximum set update delay. This is issue is caused when the same document is being edited by multiple requests and the set maximum wait period has been reached. Try again in a few minutes.',
	1206: 'A document with this UUID has already been processed. If this is not true then the source uuid value of the request needs to be updated.',
	1207: 'Sales Promotion - Field "purchaseTotalValueMax" can only be used together with "purchaseTotalValue".',
	1208: 'Sales Promotion - Field "purchaseTotalValueMax" must be larger than "purchaseTotalValue".',
	1209: 'Identity public key is temporarily unavailable; the supplied JSON Web Token could not be validated, or a new token cannot be issued. Please try again shortly.',
	1210: 'Field "reasonID" can only be used for purchase returns.',
	1211: 'This user is not allowed to confirm a document.',
	1212: 'Account has been configured to use the login app for logins. Please use the login app to log in.',
};

export default (errorCode: number): string => {
	if (errors[errorCode]) {
		return errors[errorCode];
	}
	return 'Unknown error occured';
};