import FlvjsKernel from '../kernels/FlvjsKernel';
import HlsjsKernel from '../kernels/HlsjsKernel';

class KernelRegistry {
  static instance: KernelRegistry;
  static getInstance(): KernelRegistry {
    if (!KernelRegistry.instance) {
      KernelRegistry.instance = new KernelRegistry();
    }
    return KernelRegistry.instance;
  }

  private kernels: Map<string, unknown> = new Map();
  constructor() {
    this.init();
  }

  private init() {
    this.kernels.clear();

    [FlvjsKernel, HlsjsKernel].forEach((it) => this.kernels.set(it.name, it));
  }

  register(kernels: PlayerKernel[]): void {
    (kernels || []).forEach((it) => {
      this.kernels.set(it.name, it);
    });
  }

  unregister(kernels?: PlayerKernel[]): void {
    if (!kernels) {
      this.init();
    } else {
      (kernels || []).forEach((it) => {
        this.kernels.delete(it.name);
      });
    }
  }
}

export default KernelRegistry;
