var moment = require('moment');
const replace = require('key-value-replace')
var beautify = require('js-beautify').js;
var fs = require('fs');
module.exports = {

    genuid: function () {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
        var charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    mod: function (val, val2) {
        return val % val2;
    },

    length: function (val) {

        return val.length;
    },

    eq: function (val, val2) {
        if (val == val2) return true; else return false;
    },

    gt: function (val, val2) {

        if (val > val2) return true; else return false;
    },

    add: function (val, val2) {
        return parseInt(val) + parseInt(val2);
    }, sub: function (val, val2) {
        return val - val2;
    }, multiply: function (val, val2) {
        return val * val2;
    }, divide: function (val, val2) {
        return (val / val2).toFixed(2);
    }, includes: function (val, val2) {
        return val2.includes(val)
    }, moment: function (d, f) {
        return moment(d).format(f);
    }, toFixed: function (val, num) {
        return parseFloat(val).toFixed(num);
    },

    toString: function (val) {
        if (typeof val === 'undefined') {
            return '';
        } else {
            return val.toString();
        }

    },

    parseInt: function (val) {
        return parseInt(val);
    },


    pagination: function (currentPage, totalPage, size, options) {
        var startPage, endPage, context;

        if (arguments.length === 3) {
            options = size;
            size = 5;
        }


        startPage = currentPage - Math.floor(size / 2);
        endPage = parseInt(currentPage) + parseInt(Math.floor(size / 2));

        if (startPage <= 0) {
            endPage -= (startPage - 1);
            startPage = 1;
        }

        if (endPage > totalPage) {
            endPage = totalPage;
            if (endPage - size + 1 > 0) {
                startPage = endPage - size + 1;
            } else {
                startPage = 1;
            }
        }


        context = {
            startFromFirstPage: false, pages: [], endAtLastPage: false,
        };
        if (startPage === 1) {
            context.startFromFirstPage = true;
        }
        for (var i = startPage; i <= endPage; i++) {

            context.pages.push({
                page: i, isCurrent: parseInt(i) === parseInt(currentPage),
            });
        }
        if (endPage === totalPage) {
            context.endAtLastPage = true;
        }

        return options.fn(context);
    },


    toLowerCase: function (val) {
        return val.toLowerCase();
    },


    getname: function (val, val2) {
        for (var i = 0; val.length > i; i++) {
            if ((val[i]._id).toString() === val2.toString()) {
                return val[i].name
                break;
            }
        }

    },


    toUpperCase: function (val) {
        return val.toUpperCase();
    },

}