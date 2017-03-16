"use strict";

const assert = require("assert");

const IAMUser = require("../src/user");
const strings = require("../src/strings");

describe("For IAMUser", function() {
	this.timeout(10000);

	let user;
	const userPermissions = [ {
		type: "television",
		identifier: "*",
		permissions: [
			"turn",
		]
	}, {
		type: "television",
		identifier: "Acme 1000",
		permissions: [
			"watch:sports",
			"watch:news"
		]	
	} ];

	beforeEach(function() {
		user = new IAMUser(userPermissions);
	});

	describe("for hasPermission()", function() {
		this.timeout(10000);

		beforeEach(function() {
		});

		it("returns true for permissions that are present", () => {
			let permissions = [
				["Acme 1000", "television:turn:on"],
				["Acme 1000", "television:watch:news"],
				["Acme 2000", "television:turn"],
				["*", "television:turn"]
			];

			let results = permissions.map(entry => user.hasPermission(entry[0], entry[1]));
			for (let result of results) {
				assert.equal(result, true);
			};
		});

		it("returns false for permissions that are not present", () => {
			let permissions = [
				["Acme 1000", "television:watch:vod"],
				["Acme 1000", "device:dismantle"]
			];


			let results = permissions.map(entry => user.hasPermission(entry[0], entry[1]));
			for (let result of results) {
				assert.equal(result, false);
			};
		});

		it("throws an error if passed an invalid scope", () => {
			try {
				user.hasPermission("*", "television");
				assert.true(false, "This shouldn't have been hit.");
			} catch (err) {
				assert.equal(err.name, strings.ERR_INVALID_SCOPE_NAME);
			}
		});
	});
});