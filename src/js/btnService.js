export default class BtnService {
    constructor({ loadMoreBtn, loadMoreLabel, loadMoreSpinner, classList }) {
      this.loadMoreBtn = loadMoreBtn;
      this.loadMoreLabel = loadMoreLabel;
      this.loadMoreSpinner = loadMoreSpinner;
      this.classList = classList;
    }
  
    enable() {
      this.loadMoreBtn.disabled = false;
      this.loadMoreLabel.textContent = 'Load more';
      this.loadMoreSpinner.classList.add(this.classList);
    }
  
    disable() {
      this.loadMoreBtn.disabled = true;
      this.loadMoreLabel.textContent = 'Loading...';
      this.loadMoreSpinner.classList.remove(this.classList);
    }
  
    show() {
      this.loadMoreBtn.classList.remove(this.classList);
    }
  
    hidden() {
      this.loadMoreBtn.classList.add(this.classList);
    }
  }