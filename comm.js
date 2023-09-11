$(document).ready(function() {
	$(".dropdown-item").click(function() {
		$(this).parent().prev(".dropdown-toggle").text($(this).text());
		$(this).parent().prev(".dropdown-toggle").attr("data", $(this).attr("data"));
	})
});

function action(act) {
	var target = $('#target').val();
	var key = $('#key').val();
	var algorithm = $('#algorithm').attr("data");
	var round = $('#round').attr("data");
	var mode = $('#mode').attr("data");
	if(typeof(act) == 'undefined') act = 0
	var jqxhr = $.ajax({
		url: "./api.php",
		type: "POST",
		data: {target:target, key:key, algorithm:algorithm, round:round, mode:mode, act:act}
	}).done(function(result) {
		console.log(result);
		$("#result").val(result);
	}).fail(function( jqXHR, textStatus ) {
		console.log(jqXHR);
		alert("실패");
		return false;
	});
	return false;
}

function nl2br(str){  
    return str.replace(/\n/g, "<br />");  
}  

jQuery.fn.random = function() {
    var randomIndex = Math.floor(Math.random() * this.length);  
    return jQuery(this[randomIndex]);
};

function callAPI(url, data, success, fail) {
    return jqxhr = $.ajax({
      url: url.split(':')[1],
      type: url.split(':')[0],
      dataType: "json",
      data :data
    }).done(function(result) {
      console.log(result);
      if(result.success) {
        if(typeof(success) != 'undefined') {  //do nothing without no success callback
          success(result.data);
        }
      } else {
        if(typeof(fail) == 'undefined') {
            alert(result.msg);          // just alert without fail callback
          } else {
            fail(result.msg, result.code);
          }
      }
    }).fail(function( jqXHR, textStatus ) {
      console.log(jqXHR);
    });
}

function toggleMenu() {
	if($(".sidebar").is(":visible")) {
		$(".sidebar").hide();
	} else {
		$(".sidebar").show();
	}
}

function set_cookie(name, value, expirehours, domain)
{
    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

// 쿠키 얻음
function get_cookie(name)
{
    var find_sw = false;
    var start, end;
    var i = 0;

    for (i=0; i<= document.cookie.length; i++)
    {
        start = i;
        end = start + name.length;

        if(document.cookie.substring(start, end) == name)
        {
            find_sw = true
            break
        }
    }

    if (find_sw == true)
    {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if(end < start)
            end = document.cookie.length;

        return unescape(document.cookie.substring(start, end));
    }
    return "";
}

// 쿠키 지움
function delete_cookie(name)
{
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);
    if(value != "")
        document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}