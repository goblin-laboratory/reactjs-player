export class Kernel implements KernelInterface {
  static name = '';
  protected player: unknown = null;
  protected props: KernelProps<unknown> | null = null;

  load(props: KernelProps<unknown>): Promise<unknown> {
    this.player = null;
    this.props = props;
    return Promise.resolve(this.player);
  }

  clean() {
    this.props = null;
    this.player = null;
    return Promise.resolve();
  }
}

export default Kernel;
