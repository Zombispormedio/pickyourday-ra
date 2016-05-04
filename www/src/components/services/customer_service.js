angular.module('artoolkit')
    .factory("CustomerService", function(ApiService){

    return {

        base:"customer",
        AR:function(){
            return ApiService.rest(this.base+"/augmented_reality/:marker_id",{
                collada:{method:"GET", params:{marker_id:"@marker_id"}}
            });
        }
        

    };
});


