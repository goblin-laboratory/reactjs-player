import FlvjsKernel from './FlvjsKernel';
import HlsjsKernel from './HlsjsKernel';

class Registry {
  static instance: Registry;
  static getInstance(): Registry {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }

  private kernels: Map<string, unknown> = new Map();
  constructor() {
    this.init();
  }

  private init() {
    this.kernels.clear();

    [FlvjsKernel, HlsjsKernel].forEach((it) => this.kernels.set(it.name, it));
  }

  register(kernels: KernelInterface[]): void {
    (kernels || []).forEach((it) => {
      this.kernels.set(it.name, it);
    });
  }

  unregister(kernels?: KernelInterface[]): void {
    if (!kernels) {
      this.init();
    } else {
      (kernels || []).forEach((it) => {
        this.kernels.delete(it.name);
      });
    }
  }

  genKernel(name?: string): KernelInterface | null {
    if (!name) {
      return null;
    }
    const Kernel = this.kernels.get(name) as KernelInterface;
    if (!Kernel) {
      return null;
    }
    return new Kernel();
  }
}

export default Registry;
