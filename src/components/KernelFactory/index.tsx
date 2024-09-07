import { useCreation, useDebounceEffect } from 'ahooks';
import Registry from '../../kernels/Registry';

function KernelFactory({ kernel: name, src, config, videoRef }: PlayerProps) {
  const kernel = useCreation(() => {
    return Registry.getInstance().genKernel(name);
  }, [name]);

  // NOTE
  useDebounceEffect(
    () => {
      if (!kernel) {
        return;
      }
      kernel.load({ src, config, videoRef });
      // TODO: 错误提示
      return () => {
        kernel.clean();
      };
    },
    [src, kernel],
    { wait: 500 },
  );

  return null;
}

export default KernelFactory;
