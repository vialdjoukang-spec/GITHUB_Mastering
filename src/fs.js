import { Buffer } from 'buffer';
export class MemoryFS {
 constructor(entries={}) { this.entries=new Map([['/',null],...Object.entries(entries).map(([p,b])=>[p,b===null?null:Buffer.from(b)])]); this.promises=this; }
 error(code,p){return Object.assign(new Error(`${code}: ${p}`),{code});}
 norm(p){const parts=[];for(const s of p.split('/')){if(!s||s==='.')continue;if(s==='..')parts.pop();else parts.push(s);}return '/'+parts.join('/');}
 async stat(p){p=this.norm(p);if(!this.entries.has(p))throw this.error('ENOENT',p);const d=this.entries.get(p)===null;return {type:d?'dir':'file',mode:d?0o40755:0o100644,size:d?0:this.entries.get(p).length,mtimeMs:Date.now(),ctimeMs:Date.now(),uid:0,gid:0,ino:0,dev:0,isFile:()=>!d,isDirectory:()=>d,isSymbolicLink:()=>false};}
 async lstat(p){return this.stat(p);}
 async mkdir(p){p=this.norm(p);if(this.entries.has(p))throw this.error('EEXIST',p);const parent=p.slice(0,p.lastIndexOf('/'))||'/';if(!this.entries.has(parent))throw this.error('ENOENT',parent);this.entries.set(p,null);}
 async readdir(p){p=this.norm(p);await this.stat(p);return [...this.entries.keys()].filter(x=>x!==p&&x.startsWith(p==='/'?'/':p+'/')&&!x.slice(p==='/'?1:p.length+1).includes('/')).map(x=>x.slice(x.lastIndexOf('/')+1));}
 async readFile(p,opts){p=this.norm(p);const s=await this.stat(p);if(s.isDirectory())throw this.error('EISDIR',p);const b=Buffer.from(this.entries.get(p));return (typeof opts==='string'?opts:opts?.encoding)?b.toString(typeof opts==='string'?opts:opts.encoding):b;}
 async writeFile(p,data,opts){p=this.norm(p);await this.stat(p.slice(0,p.lastIndexOf('/'))||'/');this.entries.set(p,Buffer.from(data,typeof opts==='string'?opts:opts?.encoding));}
 async unlink(p){p=this.norm(p);await this.stat(p);this.entries.delete(p);}
 async rmdir(p){if((await this.readdir(p)).length)throw this.error('ENOTEMPTY',p);this.entries.delete(this.norm(p));}
 async chmod(){}
 async readlink(p){throw this.error('EINVAL',p);}
 async symlink(){throw this.error('ENOSYS','symlink');}
 snapshot(){return Object.fromEntries([...this.entries].map(([p,b])=>[p,b===null?null:Array.from(b)]));}
}
