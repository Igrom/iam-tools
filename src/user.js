"use strict";
const strings = require("./strings");
const util = require("util");

class IAMUser {
	constructor(userPermissions) {
		if (!userPermissions) {
			let err = new ReferenceError("userPermissions");
			throw error;
		}
		this.userPermissions = userPermissions;
	}

	hasPermission(identifier, permission) {
		let segments = permission.split(":");

		// throw error for permissions of format "<type>"
		if (segments.length === 1) {
			let err = new Error(strings.ERR_INVALID_SCOPE_MESSAGE);
			err.name = strings.ERR_INVALID_SCOPE_NAME;
			throw err;
		}

		let type = segments[0];
		let soughtScope = segments.slice(1).join(":");
		// exclude policies that:
		// a) concern a different resource type
		// b) do not apply to the identifier
		let relevantPolicies = this.userPermissions.filter(v => {
			return v.type == type &&
				["*", identifier].indexOf(v.identifier) !== -1;
		});

		// for each policy, iterate through the permissions and see if there's a match 
		for (let policy of relevantPolicies) {
			for (let ownedPermission of policy.permissions) {
				if (soughtScope.indexOf(ownedPermission) === 0) {
					return true;
				}
			}
		}
		// the user hasn't the required permission.
		return false;
	}
}

module.exports = IAMUser;