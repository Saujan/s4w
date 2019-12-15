// $(document).ready(function(){
  var x={"projects":{"NP":"S4W-Nepal","CS":"S4W-CA"},"SiteTypes":{"GW":"Ground Water","PT":"Precipitation"},"Parameters":{"NP":{"GW":{"abc":"ABC"},"PT":{"one":"One"}},"CS":{"GW":{"zabc":"zABC"},"PT":{"zone":"zOne"}}}}
  var select = document.getElementById("project");
  populate(select,x['projects']);
  $(".customDate").attr("disabled",true);
  
// });

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$("#project").on('change',function(){
	var siteType = document.getElementById("siteType");
	siteType.options.length = 1;
	parameters.options.length = 1;
  // alert(siteType);
  alert(JSON.stringify(x['SiteTypes']));
	populate(siteType,x['SiteTypes']);
})

$("#siteType").on('change',function(){
	var project = $("#project").val();
	var siteType = $("#siteType").val();
	var parameters = document.getElementById("parameters");
	parameters.options.length = 1;
	project.forEach(function(projectValue){
		siteType.forEach(function(site){
			populate(parameters,x['Parameters'][projectValue][site]);
		})
	})
});



$('#defaultUnchecked').click(function(){
    if($(this).prop("checked") == true){
        // alert("Checkbox is checked.");
        $(".customDate").attr("disabled",false);
        $("#period").attr("disabled",true);
    }
    else if($(this).prop("checked") == false){
        // alert("Checkbox is unchecked.");
        $(".customDate").attr("disabled",true);
        $("#period").attr("disabled",false);
    }

});
// $("#customPeriod").on('checked',function(){
//   alert("cjecked");
//   // var project = $("#project").val();
//   // var siteType = $("#siteType").val();
//   // var parameters = document.getElementById("parameters");
//   // parameters.options.length = 1;
//   // project.forEach(function(projectValue){
//   //   siteType.forEach(function(site){
//   //     populate(parameters,x['Parameters'][projectValue][site]);
//   //   })
//   // })
// });






function populate(id,data){
	for(index in data) {
		id.options[id.options.length] = new Option(data[index], index);
	}
}

$("#view").on('click',function(){
    var project = $("#project").val();
    var siteType = $("#siteType").val();
    var parameters = $("#parameters").val();
    var data={
                'project': project,
                'siteType': siteType,
                'parameters': parameters
              };

    if($("#defaultUnchecked").prop("checked") == true){
        data["startDate"]=$("#from").val();
        data["endDate"]=$("#to").val();
        data["customize"]="yes"
    }
    else if($("#defaultUnchecked").prop("checked") == false){
        data["period"]=$("#period").val();
        data["customize"]="no"
    }
    alert(JSON.stringify(data));
    $.ajax({
      url: '/plot',
      type: "POST",
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (data) {
        // alert("qslfkjsf");
      	alert(JSON.stringify(data));
        // if (data.is_taken) {
        //   alert("A user with this username already exists.");
        // }
      }
    });

  });
