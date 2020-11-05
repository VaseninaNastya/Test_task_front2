
fetch('./products.json').then(res => res.json()).then(list => {
    products =list;


    function create(el, classNames, child, parent, ...dataAttr) {
        let element = null;
        try {
          element = document.createElement(el);
        } catch (error) {
          throw new Error('Unable to create HTMLElement! Give a proper tag name');
        }
      
        if (classNames) element.classList.add(...classNames.split(' ')); // "class1 class2 class3"
      
        if (child && Array.isArray(child)) {
          child.forEach((childElement) => childElement && element.appendChild(childElement));
        } else if (child && typeof child === 'object') {
          element.appendChild(child);
        } else if (child && typeof child === 'string') {
          element.innerHTML = child;
        }
      
        if (parent) {
          parent.appendChild(element);
        }
      
        if (dataAttr.length) {
          dataAttr.forEach(([attrName, attrValue]) => {
            if (attrValue === '') {
              element.setAttribute(attrName, '');
            }else{
                element.setAttribute(attrName, attrValue);
            }
          });
        }
        return element;
      }




//создаем эл-ты для отображения на странице
const product__area= create('div', 'product__area' )
const main = create('main', 'grid container',
    [create('div', 'sub_category_page', [
        create('div','column_right column_right_products_container',product__area)]),
]
)
document.body.prepend(main);
      //made a Product
    class Product{
        constructor(productObj){
            this.productObj = productObj;
        }
        generateLayout(){
            this.product_code = create('span', 'product_code',"Код: "+ parseInt(this.productObj.code))
            this.product_status = create('div','product_status_tooltip_container', [
                create('span','product_status',  'Наличие')
            ])


            this.product_photo = create('div','product_photo',[
                create('a','url--link product__link',[ 
                    create('img',null,null,null,['src',this.productObj.primaryImageUrl.slice(0,-4) + '_220x220_1' + this.productObj.primaryImageUrl.slice(-4)],["width",'220px'],['height','220px'])],null,['href', '#'])
            ])

            this.description = create('div',"product_description")
                this.product__link = create('a', 'product__link', this.productObj.title, this.description, ['href', '#'])
                
            let assocProducts = this.productObj.assocProducts.replace("\n","").split(";")

            let assocProduct_links = document.createElement("fragment")
            assocProducts=assocProducts.filter((item)=>{
                    if ( item.length>0 ) {
                        return item.trim()
                    }                   
                } 
            )
            assocProducts=assocProducts.map((item,index)=>{
                if ( item.length>0 ) {
                    assocProduct_links.append(
                        create('a','url--link',item.trim()), 
                        index!==(assocProducts.length-1) ? ", " : "."
                    )
                }                
            })
            this.product_tags = create('div', 'product_tags hidden-sm',[
                create('p',null,"Могут понадобиться:&nbsp"),
                assocProduct_links
            ])

            let unit = create('div', 'unit--select unit--active',[
                create('p', 'ng-binding', 'За ' + this.productObj.unit )
            ])
            let unitAlt = create('div','unit--select',[
                create('p','ng-binding','За ' + this.productObj.unitAlt)
            ])
            unit.addEventListener('click',()=>{
                unit.classList.add('unit--active')
                unitAlt.classList.remove('unit--active')
                goldPrice.textContent = 
                    (new Intl.NumberFormat('ru-RU').format(Math.round(parseFloat(this.productObj.priceGold) * 100)/100)).toString()+" ₽"
                retailPrice.textContent = 
                    (new Intl.NumberFormat('ru-RU').format(Math.round(parseFloat(this.productObj.priceRetail) * 100)/100)).toString()+" ₽"
            })
            unitAlt.addEventListener('click',()=>{
                unitAlt.classList.add('unit--active')
                unit.classList.remove('unit--active')
                goldPrice.textContent = 
                    (new Intl.NumberFormat('ru-RU').format(Math.round(parseFloat(this.productObj.priceGoldAlt) * 100)/100)).toString()+" ₽"
                retailPrice.textContent = 
                    (new Intl.NumberFormat('ru-RU').format(Math.round(parseFloat(this.productObj.priceRetailAlt) * 100)/100)).toString()+" ₽"

            })
        

            if (this.productObj.unit==this.productObj.unitAlt){
                unitAlt.style.display="none"  
            }

            this.product_units = create('div','product_units',[
                create('div', 'unit--wrapper',[
                    unit,
                    unitAlt
                ] )
            ])

            let goldPrice = create('span','goldPrice',(new Intl.NumberFormat('ru-RU').format(Math.round(parseFloat(this.productObj.priceGold) * 100)/100)).toString()+" ₽")
            let retailPrice=create('span','retailPrice',  (new Intl.NumberFormat('ru-RU').format(Math.round(parseFloat(this.productObj.priceRetail) * 100)/100)).toString()+" ₽")
this.product_price_club_card = create('p', 'product_price_club_card',[
    create('span','product_price_club_card_text', 'По карте<br>клуба'),
    goldPrice
])

this.product_price_default = create('p', 'product_price_default',[
    retailPrice
])
          

            this.product_price_points = create('div', 'product_price_points', [
                create('p',"ng-binding", `Можно купить за 231,75 балла`)
            ])
            this.list_unit_padd = create('div', 'list--unit-padd')
           

            this.list_unit_desc = create('div', 'list--unit-desc', [
                create('div', 'unit--info',[
                    create('div', 'unit--desc-i'),
                    create('div', "unit--desc-t",[
                        create('p', null,[
                            create('span', "ng-binding", 'Продается '+this.productObj.unitFull+'ми:'),
                            create('span', "unit--infoInn", this.productObj.unitRatio+ ' ' +this.productObj.unit + " = "+ this.productObj.unitRatioAlt+ ' ' + this.productObj.unitAlt)
                        ])
                    ])
                ])
            ]
            )
            if (this.productObj.unit==this.productObj.unitAlt){
                this.list_unit_desc.style.display="none"  
            }
            let counter = create('input', "product__count stepper-input", null, null, ['type',"text"],['value',"1"],['data-product-id',this.productObj.productId])
            let up =  create('span', "stepper-arrow up",null,null,['data-product-id',this.productObj.productId]);
            let down=create('span', "stepper-arrow down",null,null,['data-product-id',this.productObj.productId]);
            up.addEventListener('click',(e)=>{
                counter.value=parseInt(counter.value)+1;
            })
            down.addEventListener('click',(e)=>{
                if (parseInt(counter.value)>1)
                counter.value=parseInt(counter.value)-1;
            })
this.product__wrapper = create('div', 'product__wrapper', [
    create('div','product_count_wrapper',[
        create('div', 'stepper', [
           counter ,
           up,
            down
        ])
    ]),
    create('span', "btn btn_cart", [
        create('svg', "ic ic_cart",[
            create('use', null, `<svg id="cart">
            <path d="m14.571 16.381c.571 0 .952.381.952.952 0 .571-.381.952-.952.952-.571 0-.952-.381-.952-.952 0-.571.476-.952.952-.952m0-.952c-1.048 0-1.905.857-1.905 1.905 0 1.048.857 1.905 1.905 1.905 1.048 0 1.905-.857 1.905-1.905 0-1.048-.857-1.905-1.905-1.905"></path>
            <path d="m7.905 16.381c.571 0 .952.381.952.952 0 .571-.381.952-.952.952-.571 0-.952-.381-.952-.952 0-.571.476-.952.952-.952m0-.952c-1.048 0-1.905.857-1.905 1.905 0 1.048.857 1.905 1.905 1.905 1.048 0 1.905-.857 1.905-1.905 0-1.048-.857-1.905-1.905-1.905"></path>
            <path d="m16.476 14.476h-10.857l-.095-.381c0-.095-1.429-9.714-1.905-11.524-.381-1.524-3.333-1.429-3.333-1.429v-.952c.095 0 3.714-.286 4.286 2.19.381 1.714 1.619 9.333 1.81 11.143h10.1v.952"></path>
            <path d="m4.095 3.048h15.238v.952h-15.238z"></path>
            <path d="m5.05 10.667h12.381v.952h-12.381z"></path>
            <path d="m16.476 11.619h.952l1.905-8.571h-.952l-1.905 8.571"></path>
        </svg>`, null, ['xmlns:xlink',"http://www.w3.org/1999/xlink"],['xlink:href',"#cart"])
        ]),
        create('span', 'ng-binding', 'В корзину')
    ],null,[ 'data-url',"/cart/"], ['data-product-id',this.productObj.productId])
])

            this.product_horizontal = create('div','product product_horizontal',
            [this.product_code,
            this.product_status,
            this.product_photo  ,
            this.description, 
            this.product_tags, 
            this.product_units,
            this.product_price_club_card,
            this.product_price_default,
            this.product_price_points,
            this.list_unit_padd,
            this.list_unit_desc,
            this.product__wrapper])
            this.products_section=create('div','products_section', [
                create('div','products_page pg_0',this.product_horizontal)
            ])
return this.products_section
          }
    }
    for(let i=0;i<products.length-1;i++){
        document.querySelector('.product__area').append(
            new Product(products[i]).generateLayout()
        );
    }
})
