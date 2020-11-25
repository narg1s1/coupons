import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

interface PeOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: PeOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'pe-coupons-overlay-backdrop',
  panelClass: 'pe-coupons-overlay-panel'
}

@Injectable()
export class PeOverlayService {

  constructor(private overlay: Overlay) { }

  private getOverlayConfig(config: PeOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
  }

  private createOverlay(config: PeOverlayConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig)
  }

  open(config: PeOverlayConfig, component: ComponentType<any>) {
    const overlay = this.createOverlay({ ...DEFAULT_CONFIG, ...config });
    const portal = new ComponentPortal(component);
    const dialogRef = new PeOverlayRef(overlay);

    overlay.attach(portal);
    overlay.backdropClick().subscribe(() => dialogRef.close());

    return dialogRef;
  }

}

export class PeOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}