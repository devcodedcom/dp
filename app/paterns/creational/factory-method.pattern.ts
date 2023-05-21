interface Transport {
  name: string;
  deliver(): string;
}

class Shipping implements Transport {
  name = '';
  deliver() {
    return this.name;
  }
}

class Truck extends Shipping {
  constructor() {
    super();
    this.name = 'truck';
  }
}

class Ship extends Shipping {
  constructor() {
    super();
    this.name = 'ship';
  }
}

class Plane extends Shipping {
  constructor() {
    super();
    this.name = 'plane';
  }
}

export class ShippingFactory {
  static order(shipping: string): Shipping {
    if (shipping === 'truck') {
      return new Truck();
    } else if (shipping === 'plane') {
      return new Plane();
    } else if (shipping === 'ship') {
      return new Ship();
    }

    throw Error('No shipping provided');
  }
}

// ------- Second example


interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface ChairProps extends Dimensions {
  getDimensions(): Dimensions;
}

class Chair implements ChairProps {
  width = 0;
  height = 0;
  depth = 0;

  getDimensions(): Dimensions {
    return {
      width: this.width,
      height: this.height,
      depth: this.depth,
    }
  }
}

class SmallChair extends Chair {
  constructor() {
    super();
    this.height = 40;
    this.width = 40;
    this.depth = 40;
  }
}

class MediumChair extends Chair {
  constructor() {
    super();
    this.height = 60;
    this.width = 60;
    this.depth = 60;
  }
}

class BigChair extends Chair {
  constructor() {
    super();
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}

export class ChairFactory {
  static getChair(chair: string): Chair {
    if (chair === 'small') {
      return new SmallChair();
    } else if (chair === 'medium') {
      return new MediumChair();
    } else if (chair === 'big') {
      return new BigChair();
    }

    throw Error('Not found chairs');
  }
}

// Third Second example

interface Button {
  render(): void;
  onClick(): void;
}

class WindowsButton implements Button {
  render() {}
  onClick() {}
}

class HTMLButton implements Button {
  render() {}
  onClick() {}
}

abstract class Dialog {
  abstract createButton(): Button;

  render() {
    const button = this.createButton();
    button.onClick();
    button.render();
  }
}

class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton();
  }
}

class ApplicationFactory {
  dialog!: Dialog;

  init(platform: 'windows' | 'web') {
    if (platform === 'windows') {
      this.dialog = new WindowsDialog()
    } else if (platform === 'web') {
      this.dialog = new WebDialog();
    } else {
      throw Error('Unknown operating system');
    }
  }

  main() {
    this.init('windows');
    this.dialog.render();
  }
}

