import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Gesture, GestureController } from '@ionic/angular';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public coords: string;

  constructor(private activatedRoute: ActivatedRoute, private gestureCtrl: GestureController) {}
  
  @ViewChild('touchable') touchable: ElementRef;
  
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.touchable.nativeElement,
      threshold: 15,
      gestureName: 'my-gesture',
      onMove: (detail) => this.onMove(detail)
    }, true);
    // The `true` above ensures that callbacks run inside NgZone.

    gesture.enable();
  }

  hapticsImpactHeavy = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  hapticsImpactLight = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  hapticsVibrate = async() => {
    await Haptics.vibrate({ duration: 3000 });
  };

  hapticsSelectionStart = async () => {
    await Haptics.selectionStart();
  };

  hapticsSelectionChanged = async () => {
    await Haptics.selectionChanged();
  };

  hapticsSelectionEnd = async () => {
    await Haptics.selectionEnd();
  };

  private onMove(detail) {
    const type = detail.type;
    const currentX = detail.currentX;
    const deltaX = detail.deltaX;
    const velocityX = detail.velocityX;
  
    this.coords = `
      <div>Type: ${type}</div>
      <div>Current X: ${currentX}</div>
      <div>Delta X: ${deltaX}</div>
      <div>Velocity X: ${velocityX}</div>
    `
  }

}
