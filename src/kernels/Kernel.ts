export class Kernel<T, K> {
  static name = '';
  protected player: T | null = null;
  protected props: LoadParams<K> | null = null;

  load(props: unknown): Promise<unknown> {
    console.log('loadSource', props);
    this.player = null as T;
    this.props = props as LoadParams<K>;
    return Promise.resolve(this.player);
  }

  clean() {
    console.log('cleanup');
    this.player = null as T;
    this.props = null;
  }
}

export default Kernel;
