$("#update_user").submit(function(event){
    event.preventDefault()
    var unindex_data = $(this).serializeArray()
    var data = {}

    $.map(unindex_data, function(n,i){
        data[n['name']] = n['value']
    })

    var req = {
        'url': `http://localhost:3000/api/students/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(req).done(function(responce){
        window.location.href = "/dashboard"
    })
})

if(window.location.pathname == "/dashboard"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/students/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                location.reload();
            })
        }

    })
}