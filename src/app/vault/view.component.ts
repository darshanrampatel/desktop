import * as template from './view.component.html';

import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';

import { CipherService } from 'jslib/abstractions/cipher.service';

import { CipherView } from 'jslib/models/view/cipherView';

@Component({
    selector: 'app-vault-view',
    template: template,
})
export class ViewComponent implements OnChanges {
    @Input() cipherId: string;
    @Output() onEditCipher = new EventEmitter<string>();
    cipher: CipherView;

    constructor(private cipherService: CipherService) {
    }

    async ngOnChanges() {
        const cipher = await this.cipherService.get(this.cipherId);
        this.cipher = await cipher.decrypt();
    }

    edit() {
        this.onEditCipher.emit(this.cipher.id);
    }
}