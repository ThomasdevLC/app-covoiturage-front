import { ElementRef } from '@angular/core';
import { PostalCodeDirective } from './postal-code.directive';
import { NgControl } from '@angular/forms';

describe('PostalCodeDirective', () => {
  it('should create an instance', () => {

    const elRef = {} as ElementRef;
    const control = {} as NgControl;
    const directive = new PostalCodeDirective(elRef, control);
    expect(directive).toBeTruthy();
  });
});
