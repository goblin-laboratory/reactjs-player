import { Kernel } from './kernels';
import KernelRegistry from './KernelRegistry';
import ReactjsPlayer from './ReactjsPlayer';

Object.defineProperties(ReactjsPlayer, {
  Kernel: { value: Kernel, writable: false },
  registerKernels: {
    value: (kernels: PlayerKernel[]) => KernelRegistry.getInstance().register(kernels),
    writable: false,
  },
  unregisterKernels: {
    value: (kernels?: PlayerKernel[]) => KernelRegistry.getInstance().unregister(kernels),
    writable: false,
  },
});

export { ReactjsPlayer };
export default ReactjsPlayer;
