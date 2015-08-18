# darwinedLogin
DarwinEd login module

## API

### /token   (GET)

Pass username and password and create a token

AJAX example:
```javascript
// get user token
$.ajax({
	 url: "http://localhost:8080/token",
	 headers: {
		 'username': 'daniel',
		 'password': 'password'
	 },
	 type: "GET",
	 success: function(data) {
		 console.log('Success!');
	 }
});
```

### /secret   (GET)

Pass a Token and recive json with authenticated user data.
Next example include a check to a exist token and if exist then realize the ajax

```javascript
var token = window.localStorage.getItem('access_token');
if(token){
  $.get('http://localhost:8080/secret', { access_token: token},
      function(returnedData){
           console.log("res: ", returnedData);
  });
}else{
  console.log('no token');
}
```

to set a token in the localstorage:
```javascript
// set token in localStorage
var setToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NWNhNDc0YWUyNzc2ZThhYjc0YjU0NWIiLCJleHAiOjE0Mzk5MzE5NjE5MDF9.zvkuxwzkZ7KWk6Cjy0ktKn8Dne5RE3UebZft6E0sZo4";
window.localStorage.setItem('access_token', setToken);
```

to delete the token:
```javascript
//delete token
localStorage.removeItem('access_token');
```
