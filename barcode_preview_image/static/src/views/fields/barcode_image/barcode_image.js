import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";
import { escape } from "@web/core/utils/strings";
import { useService } from "@web/core/utils/hooks";
import { rpc } from "@web/core/network/rpc";
import { useInputField } from "@web/views/fields/input_field_hook";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

import { Component, markup } from "@odoo/owl";

export class BarcodeField extends Component {
    static template = "barcode_preview_image.BarcodeField";
    static props = {
        ...standardFieldProps,
        placeholder: { type: String, optional: true },
    };

    setup() {
        useInputField({ getValue: () => this.props.record.data[this.props.name] || "" });
        this.dialogService = useService("dialog");
    }
    get phoneHref() {
        return "#";  // "tel:" + this.props.record.data[this.props.name].replace(/\s+/g, "");
    }
    get barcodeImgURL() {
        const barcodeVal = this.props.record.data[this.props.name];
        return `<img src="/report/barcode/?barcode_type=Code128&amp;value=${barcodeVal}&amp;width=200&amp;height=100&amp;humanreadable=1&amp;quiet=0"></img>`;
    }
    async onPreviewClick(){
        const barcodeVal = this.props.record.data[this.props.name];
        console.log('barcodeVal', barcodeVal);
        debugger;
        // Use the Barcode generator Library to generate a barcode svg image & insert into the dialog.
        this.dialogService.add(ConfirmationDialog, {
            title: "Barcode Preview",
            body:
                markup(`<img src="/report/barcode/?barcode_type=Code128&amp;value=${barcodeVal}&amp;width=200&amp;height=100&amp;humanreadable=1&amp;quiet=0"></img>`),
            confirm: () => {},
            confirmLabel: _t("Close"),
        });

        // `<img src="/barcode/code128/${barcodeVal}"></img>`
    }
}

export const barcodeField = {
    component: BarcodeField,
    displayName: _t("Barcode Preview"),
    supportedTypes: ["char"],
    extractProps: ({ attrs }) => ({
        placeholder: attrs.placeholder,
    }),
};

registry.category("fields").add("barcodePreview", barcodeField);

class FormBarcodeField extends BarcodeField {
    static template = "barcode_preview_image.FormBarcodeField";
}

export const formBarcodeField = {
    ...barcodeField,
    component: FormBarcodeField,
};

registry.category("fields").add("form.barcodePreview", formBarcodeField);
