import { BuyXGetY } from '@components/admin/promotion/couponEdit/BuyXGetY';
import { TargetProducts } from '@components/admin/promotion/couponEdit/TargetProducts';
import Area from '@components/common/Area';
import { Field } from '@components/common/form/Field';
import PropTypes from 'prop-types';
import React from 'react';
import { get } from '../../../../../lib/util/get.js';


export default function DiscountType({ coupon = {} }) {
  const targetProducts = get(coupon, 'targetProducts', {});
  const buyxGety = get(coupon, 'buyxGety', []);

  return (
    <div>
      <div>
        <Area
          id="couponFormDiscountType"
          coreComponents={[
            {
              component: { default: Field },
              props: {
                name: 'discount_type',
                value: get(coupon, 'discountType'),
                options: [
                  {
                    value: 'fixed_discount_to_entire_order',
                    text: 'Fixed discount to entire order'
                  },
                  {
                    value: 'percentage_discount_to_entire_order',
                    text: 'Percentage discount to entire order'
                  },
                  {
                    value: 'fixed_discount_to_specific_products',
                    text: 'Fixed discount to specific products'
                  },
                  {
                    value: 'percentage_discount_to_specific_products',
                    text: 'Percentage discount to specific products'
                  },
                  {
                    value: 'buy_x_get_y',
                    text: 'Buy X get Y'
                  }
                ],
                validationRules: ['notEmpty'],
                type: 'radio'
              },
              sortOrder: 10
            }
          ]}
        />
      </div>
      <div className="mt-4">
        <TargetProducts
          products={get(targetProducts, 'products', [])}
          maxQty={get(targetProducts, 'maxQty', '')}
          discountType={get(coupon, 'discountType', '')}
        />
        <BuyXGetY
          requireProducts={buyxGety}
          discountType={get(coupon, 'discountType', '')}
        />
      </div>
    </div>
  );
}

DiscountType.propTypes = {
  coupon: PropTypes.shape({
    buyxGety: PropTypes.arrayOf(
      PropTypes.shape({
        sku: PropTypes.string,
        buyQty: PropTypes.string,
        getQty: PropTypes.string,
        maxY: PropTypes.string,
        discount: PropTypes.string
      })
    ),
    discountType: PropTypes.string,
    targetProducts: PropTypes.shape({
      maxQty: PropTypes.string,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          operator: PropTypes.string,
          value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.arrayOf(PropTypes.number)
          ]),
          qty: PropTypes.string
        })
      )
    })
  })
};

DiscountType.defaultProps = {
  coupon: {}
};

export const layout = {
  areaId: 'couponEditDiscountType',
  sortOrder: 30
};

export const query = `
  query Query {
    coupon(id: getContextValue('couponId', null)) {
      discountType
      targetProducts {
        maxQty
        products {
          key
          operator
          value
          qty
        }
      }
      buyxGety {
        sku
        buyQty
        getQty
        maxY
        discount
      }
    }
  }
`;
