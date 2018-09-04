import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import angular from 'rollup-plugin-angular';
import typescript from 'rollup-plugin-typescript';
var sass = require('node-sass');
export default {
    input: './src/lib/matFileUpload.ts',
    output: {
        name: 'matFileUpload',
        format: 'umd',
        file: "dist/matFileUpload.umd.js",
        sourcemap: true,
    },
    external: [
        '@angular/animations',       
        '@angular/common/http',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/cdk',
        '@angular/material',
        'rxjs/Subscription',
        'rxjs/Observable',
        'rxjs/observable/merge',
        'rxjs/operators/startWith',
        '@angular/material/icon',
        '@angular/common'
    ],
    plugins: [
    angular(
        {
            preprocessors:{
                template:template => template,
                style: scss => {
                     let css;
                     if(scss){
                         css = sass.renderSync({ data: scss }).css.toString();
                     }else{
                          css = '';
                     }
                     return css;
                },
            }
        }
    ),
    typescript({
         typescript:require('typescript')
    }),
    resolve({
         module: true,
         main: true
    }),
    commonjs({
         include: 'node_modules/**',
    })
    ],
    onwarn: warning => {
         const skip_codes = [
         'THIS_IS_UNDEFINED',
         'MISSING_GLOBAL_NAME'
    ];
    if (skip_codes.indexOf(warning.code) != -1) return;
        console.error(warning);
    }
};