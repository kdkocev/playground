{
    var someUrl = "/entity/:entityId/";
    var longUrl = "/entity/:entityId/attr/:attrId/";
    var longlongUrl = "/a/:a/b/:b/c/:c/d/:d/";
    var reverse1 = function (url, params) {
        var reversedUrl = url;
        Object.keys(params).forEach(function (key) {
            return (reversedUrl = reversedUrl.replace(":" + key, params[key].toString()));
        });
        return reversedUrl;
    };
    var response = reverse1(someUrl, { entityId: 1 });
    console.log(response);
    var isParamInString = function (str, param) { };
    isParamInString(someUrl, "entityId");
    var isParamInStr2 = function (url, param) { };
    isParamInStr2(someUrl, "entityId");
    var f1 = function (url, param) { };
    f1(someUrl, "entityId");
    var t1 = void 0;
    var t2 = void 0;
    var t2_2 = // not yet there. It doesn't return all params
     void 0; // not yet there. It doesn't return all params
    var t3 = void 0;
    var t4 = void 0;
    var t5 = void 0;
    // And now for the reverse func
    var URLS = void 0;
    (function (URLS) {
        URLS["PROFILE_PAGE"] = "/user/:userId/profile/";
        URLS["COMPANY_PRODUCT_PAGE"] = "/comapny/:companyId/product/:productId/";
    })(URLS || (URLS = {}));
    var reverse2 = function (url, params) { };
    reverse2(URLS.COMPANY_PRODUCT_PAGE, { companyId: 1, productId: 2 });
    // But the error here is unrecognisable when you make a mistake
    // let's try again:
    var reverse3 = function (url, params) { };
    reverse3(URLS.COMPANY_PRODUCT_PAGE, { companyId: 1, productId: 2 });
    // This is way better, but I still want to list only the keys
    // let's try again
    var reverse4 = function (url, params) { };
    var params4 = { companyId: 1, productId: 2 };
    reverse4(URLS.PROFILE_PAGE, params4);
    // reverse4(URLS.PROFILE_PAGE, { companyId: 1, productId: 2 });
    // error TS2353: Object literal may only specify known properties, and 'companyId' does not exist in type '{ userId: string; }'.
    reverse4(URLS.COMPANY_PRODUCT_PAGE, { companyId: 1, productId: 2 });
    // perfect!
}
{
    var o = { a: { b: { c: 1, d: "2" } } };
    var a = void 0;
}
{
}
