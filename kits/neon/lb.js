// Visor de fotos compartido por las opciones de galería
(function(){
 const st=document.createElement('style');st.textContent=`.lb{position:fixed;inset:0;z-index:99;background:#0C0E0Af2;display:none;align-items:center;justify-content:center;padding:60px 70px}
.lb.on{display:flex}.lb img{max-width:100%;max-height:100%;object-fit:contain;animation:rv .5s var(--ease) both}
.lb button{position:absolute;background:none;border:1.5px solid var(--lime);color:var(--lime);width:46px;height:46px;border-radius:50%;font-size:18px;cursor:pointer}
.lb .x{top:16px;right:16px}.lb .p{left:14px;top:50%}.lb .n{right:14px;top:50%}.lb .c{position:absolute;bottom:18px;left:0;right:0;text-align:center;font-size:13px;color:#d6dccd}
@media(max-width:640px){.lb{padding:70px 12px}.lb .p,.lb .n{top:auto;bottom:12px}}`;document.head.appendChild(st);
 const el=document.createElement('div');el.className='lb';el.setAttribute('role','dialog');el.setAttribute('aria-label','Foto ampliada');
 el.innerHTML='<img alt=""><button class="x" aria-label="Cerrar">✕</button><button class="p" aria-label="Anterior">←</button><button class="n" aria-label="Siguiente">→</button><div class="c"></div>';
 document.body.appendChild(el);let L=[],i=0;const im=el.querySelector('img'),c=el.querySelector('.c');
 const show=()=>{im.src=L[i].s;im.alt=L[i].a;c.textContent=(i+1)+' / '+L.length};
 window.openLB=(list,k)=>{L=list;i=k;show();el.classList.add('on');el.querySelector('.x').focus()};
 el.querySelector('.x').onclick=()=>el.classList.remove('on');el.onclick=e=>{if(e.target===el)el.classList.remove('on')};
 el.querySelector('.p').onclick=()=>{i=(i-1+L.length)%L.length;show()};el.querySelector('.n').onclick=()=>{i=(i+1)%L.length;show()};
 addEventListener('keydown',e=>{if(!el.classList.contains('on'))return;if(e.key==='Escape')el.classList.remove('on');if(e.key==='ArrowLeft')el.querySelector('.p').click();if(e.key==='ArrowRight')el.querySelector('.n').click()});
})();
