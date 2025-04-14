# -*- coding: utf-8 -*-
{
    'name': "Barcode Ppreview Image",

    'summary': "Add a Image Preview option for Barcode fields",

    'description': """
Add a Image Preview option for Barcode fields on the following views:
- Product Template view
- Product Variant view
    """,

    'author': "Aqeeb Imtiaz Harun",
    'website': "https://aqeebimtiaz.github.io",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '18.0.1.0.0',
    'application': True,

    # any module necessary for this one to work correctly
    'depends': ['base', 'product'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        # 'views/views.xml',
        # 'views/templates.xml',
        'views/product_view.xml',
    ],
    # only loaded in demonstration mode
    # 'demo': [
    #     'demo/demo.xml',
    # ],
    'assets': {
        'web.assets_backend': [
            'barcode_preview_image/static/src/js/lib/JsBarcode.all.min.js',
            'barcode_preview_image/static/src/views/fields/**/*'
        ],
    },
}

