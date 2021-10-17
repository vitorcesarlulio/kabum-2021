function showHidePassword() {
    var x = document.getElementById("passwordLogin");
    var shwoPassword = document.getElementById("showPassword");
    if (x.type === "password") {
        x.type = "text";
        $('#showPassword').hide();
        $('#divShowPassword').html('<span class="far fa-eye-slash" onclick="ShowHidePassword()" style="cursor: pointer;" id="showPassword">');
    } else {
        x.type = "password";
        $('#showPassword').hide();
        $('#divShowPassword').html('<span class="far fa-eye" onclick="ShowHidePassword()" style="cursor: pointer;" id="showPassword">');
    }
}