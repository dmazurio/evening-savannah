import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { ApiService } from './api.service'

interface String {
  replaceAll(str1, str2, ignore): string;
}

@Component({
  selector: 'app-editable',
  template: `
    <div #contentElement contenteditable style="display:inline-block" (input)="updateContent($event)">
      And or Lower simple moving average exponential moving average
    </div>
    <button (click)="saveData()">Save</button>
  `,
  styles: [``]
})
export class EditableComponent implements OnInit {

  @ViewChild('contentElement') contentElement:ElementRef;
  content: string = 'test';
  
  conditions = [
    {
      exp: ['and', 'or'],
      styles: "text-transform: capitalize;background: blue;"
    },
    {
      exp: ['lower', 'lower than', 'higher', 'higher than'],
      styles: "font-weight: bold;"
    },
    {
      exp: ['exponential moving average'],
      styles: "background: green;"
    },
    {
      exp: ['moving average', 'simple moving average'],
      styles: "font-weight: bold;background: orange;"
    },
    

  ]
  constructor(private _ApiService:ApiService ) { }

  ngOnInit() {
    this._ApiService.getData('dmazurio').subscribe((res)=> {
      
      if(res.content) {
        this.contentElement.nativeElement.innerHTML = res.content;
      }

      this.updateContent();
    },
    (error) => {
      alert(error);
      window.location.reload()
    })
  }
  updateContent(event=null) {
    
    let element = event ? event.target : this.contentElement.nativeElement ;

    this.content = element.innerHTML;
  
    this.content = this.content.replace(/<span style="[^>]+?">/gi, '');
    this.content = this.content.replace(/<\/span>/gi, '');
    
    this.conditions.map((render) => {
      let styles = render.styles;
      render.exp.map((find)=> {
        this.content = this.content.replace(new RegExp(`(^|[\\W^>]+?)(${find})((?!</span>)|$)`, "gi"), `$1<span style="${styles}">$2</span>$3`);   
      })
    })

    element.innerHTML = this.content;
    if(this.content) {
      this.moveCursorAtTheEnd();
    }
    console.log(this.content);
  }

  private moveCaret(): void {  
      let range = document.createRange(),
          pos = this.contentElement.nativeElement.innerText.length - 10,
          
          sel = window.getSelection();
     
      range.setStart(this.contentElement.nativeElement, -1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
  }

   moveCursorAtTheEnd(){
    var selection=document.getSelection();
    var range=document.createRange();

    if(this.contentElement.nativeElement.lastChild.nodeType==3){
      range.setStart(this.contentElement.nativeElement.lastChild,this.contentElement.nativeElement.lastChild.textContent.length);
    }else{
      range.setStart(this.contentElement.nativeElement,this.contentElement.nativeElement.childNodes.length);
    }
    selection.removeAllRanges();
    selection.addRange(range);

  }

  saveData() {
    this._ApiService.saveDate('dmazurio', this.contentElement.nativeElement.innerText.trim()).subscribe((res) => {
      alert('Saved');
    },
    (error)=> {
      alert(error)
    })
  }
  
}
