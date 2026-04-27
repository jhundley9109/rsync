/// <reference types="node" />

import { Duplex, Readable, Writable } from 'stream';

declare namespace rsync {
  type OptionValue = string | number | boolean | string[] | number[] | undefined;

  interface StreamDataHandler {
    (data: Buffer | string): void;
  }

  interface Pattern {
    action: '+' | '-';
    pattern: string;
  }

  interface ExecuteOptions {
    stdoutHandler?: StreamDataHandler;
    stderrHandler?: StreamDataHandler;
  }

  interface BuildOptions {
    [key: string]: any;
  }

  class Rsync {
    constructor(config?: {
      executable?: string;
      stderr?: Writable | Duplex;
      stdout?: Writable | Duplex;
      stdin?: Readable | Duplex;
    });

    set(option: string, value?: OptionValue): this;
    set(option: Array<[string, OptionValue]>): this;
    unset(option?: string): this;

    setFlags(...flags: Array<string | string[]>): this;
    unsetFlags(...flags: Array<string | string[]>): this;
    flags(flags: string | string[]): void;

    isSet(option: string): boolean;
    option(option: string): OptionValue;

    patterns(...patterns: Array<string | Pattern | Array<string | Pattern>>): this;
    exclude(...patterns: Array<string | string[]>): this;
    include(...patterns: Array<string | string[]>): this;

    args(): string[];
    command(): string;
    toString(): string;

    cwd(): string;
    cwd(cwd: string): this;

    env(): NodeJS.ProcessEnv;
    env(env: NodeJS.ProcessEnv): this;

    output(stdout: StreamDataHandler, stderr: StreamDataHandler): this;
    output(handlers: [StreamDataHandler, StreamDataHandler]): this;

    execute(opts?: ExecuteOptions): Promise<number | null>;

    stdout(): Writable | Duplex;
    stdout(stream: Writable | Duplex): this;

    stderr(): Writable | Duplex;
    stderr(stream: Writable | Duplex): this;

    stdin(): Readable | Duplex;
    stdin(stream: Readable | Duplex): this;

    executable(): string;
    executable(executable: string): this;

    destination(): string;
    destination(destination: string): this;

    source(): string[];
    source(source: string | string[]): this;

    shell(shell?: string): this | OptionValue;
    chmod(value?: string | string[]): this | OptionValue;
    delete(set?: boolean): this;
    progress(set?: boolean): this;
    archive(set?: boolean): this;
    compress(set?: boolean): this;
    recursive(set?: boolean): this;
    update(set?: boolean): this;
    quiet(set?: boolean): this;
    dirs(set?: boolean): this;
    links(set?: boolean): this;
    dry(set?: boolean): this;
    hardLinks(set?: boolean): this;
    perms(set?: boolean): this;
    executability(set?: boolean): this;
    group(set?: boolean): this;
    owner(set?: boolean): this;
    acls(set?: boolean): this;
    xattrs(set?: boolean): this;
    devices(set?: boolean): this;
    specials(set?: boolean): this;
    times(set?: boolean): this;

    static build(options: BuildOptions): Rsync;
  }
}

declare function rsync(config?: {
  executable?: string;
  stderr?: Writable | Duplex;
  stdout?: Writable | Duplex;
  stdin?: Readable | Duplex;
}): rsync.Rsync;

declare namespace rsync {
  export { Rsync };
}

export = rsync;