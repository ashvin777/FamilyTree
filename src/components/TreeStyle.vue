<style lang="scss">
    .tree {
        ul {
            padding-top: 20px;
            position: relative;
            padding-left: 0px;
        }
        li {
            float: left;
            text-align: center;
            list-style-type: none;
            position: relative;
            padding: 20px 5px 0;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                right: 50%;
                border-top: 1px solid #ccc;
                width: 50%;
                height: 20px;
            }
            &::after {
                content: '';
                position: absolute;
                top: 0;
                right: 50%;
                border-top: 1px solid #ccc;
                width: 50%;
                height: 20px;
                right: auto;
                left: 50%;
                border-left: 1px solid #ccc;
            }
            &:only-child {
                &::after,
                &::before {
                    display: none;
                }
                padding-top: 0;
            }
            &:first-child::before {
                border: 0 none;
            }
            &:last-child {
                &::after {
                    border: 0 none;
                }
                &::before {
                    border-right: 1px solid #ccc;
                    border-radius: 0 5px 0 0;
                    -webkit-border-radius: 0 5px 0 0;
                    -moz-border-radius: 0 5px 0 0;
                }
            }
            &:first-child::after {
                border-radius: 5px 0 0 0;
                -webkit-border-radius: 5px 0 0 0;
                -moz-border-radius: 5px 0 0 0;
            }
            &:only-child {
                left: 50%;
                transform: translateX(-50%);
            }
        }
        text-align: center;
        overflow: auto;
        height: 100%;
        >ul {
            width: 5000px;
            height: 100%;
            padding: 0px;
            padding-top: 0px;
            transform-origin: center top;
            >li {
                // margin: 6/0px 0;
                margin-bottom: 100px;
            }
        }
        ul ul::before {
            content: '';
            position: absolute;
            top: 0;
            left: calc( 50% - 0.5px);
            border-left: 1px solid #ccc;
            width: 0;
            height: 20px;
        }
        li a {
            // border: 1px solid #ccc;
            // padding: 5px 10px;
            text-decoration: none;
            color: #666;
            font-family: arial, verdana, tahoma;
            font-size: 11px;
            display: inline-block;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            /*transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;*/
            // &:hover {
            //     background: #c8e4f8;
            //     color: #000;
            //     border: 1px solid #94a0b4;
            //     + ul {
            //         li {
            //             a {
            //                 background: #c8e4f8;
            //                 color: #000;
            //                 border: 1px solid #94a0b4;
            //             }
            //             &::after,
            //             &::before {
            //                 border-color: #94a0b4;
            //             }
            //         }
            //         &::before,
            //         ul::before {
            //             border-color: #94a0b4;
            //         }
            //     }
            // }
        }
    }
    
    ul:not(.md-list)>li+li {
        margin-top: 0;
    }
    
    .node {
        width: 130px;
        margin: auto;
        display: inline-block;
        padding: 0 10px;
        position: relative;
        &.partners {
            &:nth-of-type(1):after {
                content: '';
                position: absolute;
                top: 50%;
                right: -0.5px;
                border-top: 1px solid #ccc;
                width: 11px;
                height: 0;
            }
            &:nth-of-type(2):after {
                content: '';
                position: absolute;
                top: 50%;
                left: -1px;
                border-top: 1px solid #ccc;
                width: 11px;
                height: 0;
            }
            &.open {
                &:nth-of-type(1):before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: -0.5px;
                    border-right: 1px solid #ccc;
                    width: 0;
                    height: 50%;
                }
            }
            &:not(.root) {
                &:nth-of-type(2):before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -0px;
                    border-right: 1px solid #ccc;
                    width: 0;
                    height: 50%;
                }
            }
        }
    }
</style>
