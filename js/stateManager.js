export class StateManager {
  constructor() {
    this.states = [];
  }
  setState(state) {
    this.states = state;
  }
  get state() {
    return this.states;
  }
  set state(state) {
    this.states = state;
  }
  toggleState(id, key, value) {
    const res = this.state.reduce((p, c) => {
      if (c.id == id) {
        if (value !== undefined) {
          c[key] = value;
        } else {
          c[key] = true;
        }

        p.push(c);
      } else {
        if (value === undefined) {
          c[key] = false;
        }

        p.push(c);
      }
      return p;
    }, []);
    this.setState(res);
  }
  stateRefresh(key) {
    this.setState(
      this.state.reduce((p, c) => {
        c[key] = false;
        p.push(c);
        return p;
      }, [])
    );
  }
}
