<?php
/*
Template Name: checkout
*/
?>
<?php get_header(); ?>
<div class="main">
    <div class="container32">
        <div class="ccc">
            <!--w8ntjqt4-->

                <div class="content-from-container-form">

                    <?php
                        if ( WC()->cart->is_empty() ) {
                            // Корзина пуста
							echo '<div class="advantages-form-2">';
							echo '<h1 class="iouawhgb-2">Ваш заказ выполнен!</h1>';
							echo '</div>';
                            exit; // выходим со страницы
                        }
                    ?>
                    
                    <div class="advantages-form-2">
                        <h1 class="iouawhgb-2">Оформление заказа</h1>
                    </div>
					
                    <div class="advantages-form">
                        <div class="checkout2">
                            
                            <!--<form name="checkout" method="post" class="checkout woocommerce-checkout" action="https://acadtopoplan/checkout/" enctype="multipart/form-data" aria-label="Оформление заказа" novalidate="novalidate">-->
                            <!--<form name="checkout" method="post" class="checkout" action="https://acadtopoplan/checkout/" enctype="multipart/form-data" aria-label="Оформление заказа" novalidate="novalidate">-->
                            <form name="checkout" method="post" class="checkout" action="https://acadtopoplan/checkout/" enctype="multipart/form-data" aria-label="Оформление заказа" novalidate="novalidate">
                                <p class="ch-tag">Контактная информация</p>

                                <div class="contact-form">

                                    <div class='owrubh'>
                                        <div class="Input">
                                            <input autocomplete="off" type="text" class="input-form-ch" name="billing_last_name" id="billing_last_name" placeholder="" value="" aria-required="true">
                                            <label for="billing_last_name" class="Input-label">Фамилия</label>
                                        </div>
                                        <div class="Input">
                                            <input autocomplete="off" type="text" class="input-form-ch" name="billing_first_name" id="billing_first_name" placeholder="" value="" aria-required="true">
                                            <label for="billing_first_name" class="Input-label">имя</label>
                                        </div>
                                    </div>
                                    <div class="Input">
                                        <input autocomplete="off" type="wide" class="input-form-ch" name="billing_patronymic" id="billing_patronymic" placeholder="" value="" aria-required="true">
                                        <label for="billing_patronymic" class="Input-label">Отчество</label>
                                    </div>
                                    <div class="Input">
                                        <input autocomplete="off" type="tel" class="input-form-ch" name="billing_phone" id="billing_phone" placeholder="" value="" aria-required="true">
                                        <label for="billing_phone" class="Input-label">телефон</label>
                                    </div>
                                    <div class="Input">
                                        <input  autocomplete="off" type="email" class="input-form-ch" name="billing_email" id="billing_email" placeholder="" value="" aria-required="true">
                                        <label for="billing_email" class="Input-label">Email</label>
                                    </div>
                                    <div class="Input">
                                    <input autocomplete="off" type="text" class="input-form-ch" name="billing_cod" id="billing_cod" placeholder="" value="" aria-required="true">
                                        <label for="billing_cod" class="Input-label">GUID</label>
                                    </div>
									<a href="https://acadtopoplan.ru/help/?content=help-activation" target="_blank" rel="noreferrer noopener">Узнайте, как и где получить GUID-идентификатор...</a>
                                </div>
                            

                                <div id="order_review" class="woocommerce-checkout-review-order">
                                    <div id="payment" class="woocommerce-checkout-payment">
                                        <div class="form-row place-order">
                                            <button type="submit" name="woocommerce_checkout_place_order" id="place_order" value="Подтвердить заказ" data-value="Подтвердить заказ">Подтвердить заказ</button>
                                            <input autocomplete="off" type="hidden" id="woocommerce-process-checkout-nonce" name="woocommerce-process-checkout-nonce" value="ab7ed0d2be">
                                            <input autocomplete="off" type="hidden" name="_wp_http_referer" value="/?wc-ajax=update_order_review">
                                        </div>
                                    </div>
                                </div>
                            
                            </form>
                            <form class="checkout_coupon" method="post">
                                <p class="ch-tag">Детали заказа</p>

                                <div class="tovar-card">
                                    <?php
                                        // Получаем товары из корзины
                                        $cart_items = WC()->cart->get_cart();

                                        if (!empty($cart_items)) {

                                            foreach ($cart_items as $cart_item_key => $cart_item) {
                                                $product = $cart_item['data'];
                                                $product_id = $product->get_id();
                                                $product_name = $product->get_name();
                                                $product_sku = $product->get_sku();
                                                $product_image = wp_get_attachment_image_src(get_post_thumbnail_id($product->get_id()), 'full');
                                                
                                                $product_price = $product->get_price(); // Стоимость
                                                $formatted_price = number_format($product_price, 0, ',', ' '); // Форматируем цену
                                                // Получаем объект заказа
                                                $order = WC()->cart;
                                                // Получаем общую сумму
                                                $total = $order->total;
                                                // Выводим общую сумму

                                                echo '<div class="image-card">';
                                                if ($product_image) {
                                                    echo '<img src="' . esc_url($product_image[0]) . '">';
                                                }
                                                echo '</div>';
                                                echo '<span class="tovar-name">' . esc_html($product_name) . '</span>'; // Название товара
                                                echo '<div class="card-met">';
                                                echo '<p class="tovar-tag">' . esc_html($product_sku) . ' дней</p>'; // Артикул товара
                                                echo '</div>';
                                                echo '<div class="card-text">';
                                                echo '<span class="tovar-dop">Стоимость<span class="tovar-price">' . $formatted_price . ' RUB</span></span>';
                                                echo '</div>';
                                                echo '<div class="sep-c"></div>';
                                                
                                            }
                                        }
                                    ?>
                                    
                                    <input autocomplete="off" type="text" name="coupon_code" class="input-cupon" placeholder="PROMOCODE" id="coupon_code" value="">
                                    <button type="submit" class="button" name="apply_coupon" value="Применить купон">Применить купон</button>
                                    <div class="sep-c"></div>
                                    <table class="woocommerce-checkout-review-order-table"></table>
  
                                </div>
                            </form>
                        </div>
                            
                    </div>
                </div>
               
                
            </div>
            
    
        </div>
    </div>

    <div class="container32">
        <div class="ccc">
            <div class="content-from-container-form">
                <div class="advantages-form">
                    <div class="pre">
						<div class="text-area-pre">
						Выдержка из договора-оферты:
						<br>
						<br>6. Возврат Заказа
						<br>6.1. Программное обеспечение является невозвратным продуктом на основании закона об Объектах авторских прав (ч.1 ст. 1259 ГК РФ).
						<br>После выпуска лицензии правообладателем и регистрации данных конечного пользователя возврат программного обеспечения будет невозможен в связи с тем, что программное обеспечение относится к объектам авторских прав и охраняется, как литературное произведение в соответствии с ч.1 ст. 1259 ГК РФ. Покупатель приобретает права на использование Программного Обеспечения по Лицензионному договору с производителем. Так же именные лицензии возврату и обмену не подлежат согласно п.21 Правил продажи товаров дистанционным способом, утвержденных Постановлением Правительства РФ от 27.09.2007 N 612 (ред. от 04.10.2012): «покупатель не вправе отказаться от товара надлежащего качества, имеющего индивидуально-определенные свойства, если указанный товар может быть использован исключительно приобретающим его потребителем». К именным лицензиям относятся корпоративные именные лицензии, лицензии, оформленные на конкретное юридическое или физическое лицо.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<?php get_footer(); ?>
