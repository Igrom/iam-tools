# iam-tools
Faciliates work with permissions of type:

```javascript
[ {
	type: "type",
	identifier: "identifier" | "*",
	permissions: [
		"scope1:scope2"
		"scope1:scope3"
		"scope4:scope5:scope6"
		"scope7"
	]
} ]
```

## Checking permissions

```javascript
let userPermissions = [ {
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

let john = new IAMUser(userPermissions);

assert.equal(john.hasPermission("Acme 1000", "television:turn:on"), true);
assert.equal(john.hasPermission("Acme 1000", "television:watch:news"), true);
assert.equal(john.hasPermission("Acme 2000", "television:turn"), true);
assert.equal(john.hasPermission("*", "television:turn"), true);

assert.equal(john.hasPermission("Acme 1000", "television:watch:vod"), false);
assert.equal(john.hasPermission("Acme 1000", "device:dismantle"), false);
```