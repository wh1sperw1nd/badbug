var MERCATOR_RANGE=256;
function bound(b,a,c){
    if(a!=null){
        b=Math.max(b,a)
        }
        if(c!=null){
        b=Math.min(b,c)
        }
        return b
    }

    function MercatorProjection(){
    this.pixelOrigin_=new google.maps.Point(MERCATOR_RANGE/2,MERCATOR_RANGE/2);
    this.pixelsPerLonDegree_=MERCATOR_RANGE/360;
    this.pixelsPerLonRadian_=MERCATOR_RANGE/(2*Math.PI)
    }
var THREE=THREE||{};
THREE.Color=function(b){
    this.__styleString="rgba(0, 0, 0, 1)";
    this.setHex=function(a){
        this.hex=a;
        this.updateRGBA();
        this.updateStyleString()
        };
        
    this.setRGBA=function(a,g,j,h){
        this.r=a;
        this.g=g;
        this.b=j;
        this.a=h;
        this.updateHex();
        this.updateStyleString()
        };
        
    this.updateHex=function(){
        this.hex=Math.floor(this.a*255)<<24|Math.floor(this.r*255)<<16|Math.floor(this.g*255)<<8|Math.floor(this.b*255)
        };
        
    this.updateRGBA=function(){
        this.a=(this.hex>>24&255)/255;
        this.r=(this.hex>>16&255)/255;
        this.g=(this.hex>>8&255)/255;
        this.b=(this.hex&255)/255
        };
        
    this.updateStyleString=function(){
        this.__styleString="rgba("+Math.floor(this.r*255)+","+Math.floor(this.g*255)+","+Math.floor(this.b*255)+","+this.a+")"
        };
        
    this.toString=function(){
        return"THREE.Color ( r: "+this.r+", g: "+this.g+", b: "+this.b+", a: "+this.a+", hex: "+this.hex+" )"
        };
        
    this.setHex(b)
    };
    
THREE.Vector2=function(e,c){
    this.x=e||0;
    this.y=c||0
    };
    
THREE.Vector2.prototype={
    set:function(e,c){
        this.x=e;
        this.y=c
        },
    copy:function(b){
        this.x=b.x;
        this.y=b.y
        },
    addSelf:function(b){
        this.x+=b.x;
        this.y+=b.y
        },
    add:function(c,e){
        this.x=c.x+e.x;
        this.y=c.y+e.y
        },
    subSelf:function(b){
        this.x-=b.x;
        this.y-=b.y
        },
    sub:function(c,e){
        this.x=c.x-e.x;
        this.y=c.y-e.y
        },
    multiplyScalar:function(b){
        this.x*=b;
        this.y*=b
        },
    unit:function(){
        this.multiplyScalar(1/this.length())
        },
    length:function(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
        },
    lengthSq:function(){
        return this.x*this.x+this.y*this.y
        },
    negate:function(){
        this.x=-this.x;
        this.y=-this.y
        },
    clone:function(){
        return new THREE.Vector2(this.x,this.y)
        },
    toString:function(){
        return"THREE.Vector2 ("+this.x+", "+this.y+")"
        }
    };

THREE.Vector3=function(f,g,e){
    this.x=f||0;
    this.y=g||0;
    this.z=e||0
    };
    
THREE.Vector3.prototype={
    set:function(f,g,e){
        this.x=f;
        this.y=g;
        this.z=e
        },
    copy:function(b){
        this.x=b.x;
        this.y=b.y;
        this.z=b.z
        },
    add:function(c,e){
        this.x=c.x+e.x;
        this.y=c.y+e.y;
        this.z=c.z+e.z
        },
    addSelf:function(b){
        this.x+=b.x;
        this.y+=b.y;
        this.z+=b.z
        },
    addScalar:function(b){
        this.x+=b;
        this.y+=b;
        this.z+=b
        },
    sub:function(c,e){
        this.x=c.x-e.x;
        this.y=c.y-e.y;
        this.z=c.z-e.z
        },
    subSelf:function(b){
        this.x-=b.x;
        this.y-=b.y;
        this.z-=b.z
        },
    cross:function(c,e){
        this.x=c.y*e.z-c.z*e.y;
        this.y=c.z*e.x-c.x*e.z;
        this.z=c.x*e.y-c.y*e.x
        },
    crossSelf:function(h){
        var e=this.x,f=this.y,g=this.z;
        this.x=f*h.z-g*h.y;
        this.y=g*h.x-e*h.z;
        this.z=e*h.y-f*h.x
        },
    multiplySelf:function(b){
        this.x*=b.x;
        this.y*=b.y;
        this.z*=b.z
        },
    multiplyScalar:function(b){
        this.x*=b;
        this.y*=b;
        this.z*=b
        },
    divideScalar:function(b){
        this.x/=b;
        this.y/=b;
        this.z/=b
        },
    dot:function(b){
        return this.x*b.x+this.y*b.y+this.z*b.z
        },
    distanceTo:function(b){
        return Math.sqrt(this.distanceToSquared(b))
        },
    distanceToSquared:function(g){
        var h=this.x-g.x,e=this.y-g.y,f=this.z-g.z;
        return h*h+e*e+f*f
        },
    length:function(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
        },
    lengthSq:function(){
        return this.x*this.x+this.y*this.y+this.z*this.z
        },
    negate:function(){
        this.x=-this.x;
        this.y=-this.y;
        this.z=-this.z
        },
    normalize:function(){
        if(this.length()>0){
            this.multiplyScalar(1/this.length())
            }else{
            this.multiplyScalar(0)
            }
        },
isZero:function(){
    var b=0.0001;
    return(Math.abs(this.x)<b)&&(Math.abs(this.y)<b)&&(Math.abs(this.z)<b)
    },
clone:function(){
    return new THREE.Vector3(this.x,this.y,this.z)
    },
toString:function(){
    return"THREE.Vector3 ( "+this.x+", "+this.y+", "+this.z+" )"
    }
};

THREE.Vector4=function(f,g,h,e){
    this.x=f||0;
    this.y=g||0;
    this.z=h||0;
    this.w=e||1
    };
    
THREE.Vector4.prototype={
    set:function(f,g,h,e){
        this.x=f;
        this.y=g;
        this.z=h;
        this.w=e
        },
    copy:function(b){
        this.x=b.x;
        this.y=b.y;
        this.z=b.z;
        this.w=b.w
        },
    add:function(c,e){
        this.x=c.x+e.x;
        this.y=c.y+e.y;
        this.z=c.z+e.z;
        this.w=c.w+e.w
        },
    addSelf:function(b){
        this.x+=b.x;
        this.y+=b.y;
        this.z+=b.z;
        this.w+=b.w
        },
    sub:function(c,e){
        this.x=c.x-e.x;
        this.y=c.y-e.y;
        this.z=c.z-e.z;
        this.w=c.w-e.w
        },
    subSelf:function(b){
        this.x-=b.x;
        this.y-=b.y;
        this.z-=b.z;
        this.w-=b.w
        },
    clone:function(){
        return new THREE.Vector4(this.x,this.y,this.z,this.w)
        },
    toString:function(){
        return"THREE.Vector4 ("+this.x+", "+this.y+", "+this.z+", "+this.w+")"
        }
    };

THREE.Rectangle=function(){
    var n,l,q,m,k,r,p=true;
    function j(){
        k=q-n;
        r=m-l
        }
        this.getX=function(){
        return n
        };
        
    this.getY=function(){
        return l
        };
        
    this.getWidth=function(){
        return k
        };
        
    this.getHeight=function(){
        return r
        };
        
    this.getX1=function(){
        return n
        };
        
    this.getY1=function(){
        return l
        };
        
    this.getX2=function(){
        return q
        };
        
    this.getY2=function(){
        return m
        };
        
    this.set=function(c,a,e,b){
        p=false;
        n=c;
        l=a;
        q=e;
        m=b;
        j()
        };
        
    this.addPoint=function(b,a){
        if(p){
            p=false;
            n=b;
            l=a;
            q=b;
            m=a
            }else{
            n=Math.min(n,b);
            l=Math.min(l,a);
            q=Math.max(q,b);
            m=Math.max(m,a)
            }
            j()
        };
        
    this.addRectangle=function(a){
        if(p){
            p=false;
            n=a.getX1();
            l=a.getY1();
            q=a.getX2();
            m=a.getY2()
            }else{
            n=Math.min(n,a.getX1());
            l=Math.min(l,a.getY1());
            q=Math.max(q,a.getX2());
            m=Math.max(m,a.getY2())
            }
            j()
        };
        
    this.inflate=function(a){
        n-=a;
        l-=a;
        q+=a;
        m+=a;
        j()
        };
        
    this.minSelf=function(a){
        n=Math.max(n,a.getX1());
        l=Math.max(l,a.getY1());
        q=Math.min(q,a.getX2());
        m=Math.min(m,a.getY2());
        j()
        };
        
    this.instersects=function(a){
        return Math.min(q,a.getX2())-Math.max(n,a.getX1())>=0&&Math.min(m,a.getY2())-Math.max(l,a.getY1())>=0
        };
        
    this.empty=function(){
        p=true;
        n=0;
        l=0;
        q=0;
        m=0;
        j()
        };
        
    this.isEmpty=function(){
        return p
        };
        
    this.toString=function(){
        return"THREE.Rectangle (x1: "+n+", y1: "+m+", x2: "+q+", y1: "+l+", width: "+k+", height: "+r+")"
        }
    };

THREE.Matrix4=function(){
    this._x=new THREE.Vector3();
    this._y=new THREE.Vector3();
    this._z=new THREE.Vector3()
    };
    
THREE.Matrix4.prototype={
    n11:1,
    n12:0,
    n13:0,
    n14:0,
    n21:0,
    n22:1,
    n23:0,
    n24:0,
    n31:0,
    n32:0,
    n33:1,
    n34:0,
    n41:0,
    n42:0,
    n43:0,
    n44:1,
    identity:function(){
        this.n11=1;
        this.n12=0;
        this.n13=0;
        this.n14=0;
        this.n21=0;
        this.n22=1;
        this.n23=0;
        this.n24=0;
        this.n31=0;
        this.n32=0;
        this.n33=1;
        this.n34=0;
        this.n41=0;
        this.n42=0;
        this.n43=0;
        this.n44=1
        },
    lookAt:function(l,m,g){
        var h=this._x,j=this._y,k=this._z;
        k.sub(l,m);
        k.normalize();
        h.cross(g,k);
        h.normalize();
        j.cross(k,h);
        j.normalize();
        this.n11=h.x;
        this.n12=h.y;
        this.n13=h.z;
        this.n14=-h.dot(l);
        this.n21=j.x;
        this.n22=j.y;
        this.n23=j.z;
        this.n24=-j.dot(l);
        this.n31=k.x;
        this.n32=k.y;
        this.n33=k.z;
        this.n34=-k.dot(l)
        },
    transform:function(g){
        var j=g.x,k=g.y,f=g.z,h=g.w?g.w:1;
        g.x=this.n11*j+this.n12*k+this.n13*f+this.n14*h;
        g.y=this.n21*j+this.n22*k+this.n23*f+this.n24*h;
        g.z=this.n31*j+this.n32*k+this.n33*f+this.n34*h;
        h=this.n41*j+this.n42*k+this.n43*f+this.n44*h;
        if(g.w){
            g.w=h
            }else{
            g.x=g.x/h;
            g.y=g.y/h;
            g.z=g.z/h
            }
        },
crossVector:function(a){
    var e=new THREE.Vector4();
    e.x=this.n11*a.x+this.n12*a.y+this.n13*a.z+this.n14*a.w;
    e.y=this.n21*a.x+this.n22*a.y+this.n23*a.z+this.n24*a.w;
    e.z=this.n31*a.x+this.n32*a.y+this.n33*a.z+this.n34*a.w;
    e.w=(a.w)?this.n41*a.x+this.n42*a.y+this.n43*a.z+this.n44*a.w:1;
    return e
    },
multiply:function(a,b){
    this.n11=a.n11*b.n11+a.n12*b.n21+a.n13*b.n31+a.n14*b.n41;
    this.n12=a.n11*b.n12+a.n12*b.n22+a.n13*b.n32+a.n14*b.n42;
    this.n13=a.n11*b.n13+a.n12*b.n23+a.n13*b.n33+a.n14*b.n43;
    this.n14=a.n11*b.n14+a.n12*b.n24+a.n13*b.n34+a.n14*b.n44;
    this.n21=a.n21*b.n11+a.n22*b.n21+a.n23*b.n31+a.n24*b.n41;
    this.n22=a.n21*b.n12+a.n22*b.n22+a.n23*b.n32+a.n24*b.n42;
    this.n23=a.n21*b.n13+a.n22*b.n23+a.n23*b.n33+a.n24*b.n43;
    this.n24=a.n21*b.n14+a.n22*b.n24+a.n23*b.n34+a.n24*b.n44;
    this.n31=a.n31*b.n11+a.n32*b.n21+a.n33*b.n31+a.n34*b.n41;
    this.n32=a.n31*b.n12+a.n32*b.n22+a.n33*b.n32+a.n34*b.n42;
    this.n33=a.n31*b.n13+a.n32*b.n23+a.n33*b.n33+a.n34*b.n43;
    this.n34=a.n31*b.n14+a.n32*b.n24+a.n33*b.n34+a.n34*b.n44;
    this.n41=a.n41*b.n11+a.n42*b.n21+a.n43*b.n31+a.n44*b.n41;
    this.n42=a.n41*b.n12+a.n42*b.n22+a.n43*b.n32+a.n44*b.n42;
    this.n43=a.n41*b.n13+a.n42*b.n23+a.n43*b.n33+a.n44*b.n43;
    this.n44=a.n41*b.n14+a.n42*b.n24+a.n43*b.n34+a.n44*b.n44
    },
multiplySelf:function(F){
    var u=this.n11,v=this.n12,x=this.n13,z=this.n14,C=this.n21,D=this.n22,E=this.n23,G=this.n24,H=this.n31,m=this.n32,s=this.n33,t=this.n34,w=this.n41,y=this.n42,A=this.n43,B=this.n44;
    this.n11=u*F.n11+v*F.n21+x*F.n31+z*F.n41;
    this.n12=u*F.n12+v*F.n22+x*F.n32+z*F.n42;
    this.n13=u*F.n13+v*F.n23+x*F.n33+z*F.n43;
    this.n14=u*F.n14+v*F.n24+x*F.n34+z*F.n44;
    this.n21=C*F.n11+D*F.n21+E*F.n31+G*F.n41;
    this.n22=C*F.n12+D*F.n22+E*F.n32+G*F.n42;
    this.n23=C*F.n13+D*F.n23+E*F.n33+G*F.n43;
    this.n24=C*F.n14+D*F.n24+E*F.n34+G*F.n44;
    this.n31=H*F.n11+m*F.n21+s*F.n31+t*F.n41;
    this.n32=H*F.n12+m*F.n22+s*F.n32+t*F.n42;
    this.n33=H*F.n13+m*F.n23+s*F.n33+t*F.n43;
    this.n34=H*F.n14+m*F.n24+s*F.n34+t*F.n44;
    this.n41=w*F.n11+y*F.n21+A*F.n31+B*F.n41;
    this.n42=w*F.n12+y*F.n22+A*F.n32+B*F.n42;
    this.n43=w*F.n13+y*F.n23+A*F.n33+B*F.n43;
    this.n44=w*F.n14+y*F.n24+A*F.n34+B*F.n44
    },
multiplyScalar:function(b){
    this.n11*=b;
    this.n12*=b;
    this.n13*=b;
    this.n14*=b;
    this.n21*=b;
    this.n22*=b;
    this.n23*=b;
    this.n24*=b;
    this.n31*=b;
    this.n32*=b;
    this.n33*=b;
    this.n34*=b;
    this.n41*=b;
    this.n42*=b;
    this.n43*=b;
    this.n44*=b
    },
determinant:function(){
    return(this.n14*this.n23*this.n32*this.n41-this.n13*this.n24*this.n32*this.n41-this.n14*this.n22*this.n33*this.n41+this.n12*this.n24*this.n33*this.n41+this.n13*this.n22*this.n34*this.n41-this.n12*this.n23*this.n34*this.n41-this.n14*this.n23*this.n31*this.n42+this.n13*this.n24*this.n31*this.n42+this.n14*this.n21*this.n33*this.n42-this.n11*this.n24*this.n33*this.n42-this.n13*this.n21*this.n34*this.n42+this.n11*this.n23*this.n34*this.n42+this.n14*this.n22*this.n31*this.n43-this.n12*this.n24*this.n31*this.n43-this.n14*this.n21*this.n32*this.n43+this.n11*this.n24*this.n32*this.n43+this.n12*this.n21*this.n34*this.n43-this.n11*this.n22*this.n34*this.n43-this.n13*this.n22*this.n31*this.n44+this.n12*this.n23*this.n31*this.n44+this.n13*this.n21*this.n32*this.n44-this.n11*this.n23*this.n32*this.n44-this.n12*this.n21*this.n33*this.n44+this.n11*this.n22*this.n33*this.n44)
    },
clone:function(){
    var b=new THREE.Matrix4();
    b.n11=this.n11;
    b.n12=this.n12;
    b.n13=this.n13;
    b.n14=this.n14;
    b.n21=this.n21;
    b.n22=this.n22;
    b.n23=this.n23;
    b.n24=this.n24;
    b.n31=this.n31;
    b.n32=this.n32;
    b.n33=this.n33;
    b.n34=this.n34;
    b.n41=this.n41;
    b.n42=this.n42;
    b.n43=this.n43;
    b.n44=this.n44;
    return b
    },
toString:function(){
    return"| "+this.n11+" "+this.n12+" "+this.n13+" "+this.n14+" |\n| "+this.n21+" "+this.n22+" "+this.n23+" "+this.n24+" |\n| "+this.n31+" "+this.n32+" "+this.n33+" "+this.n34+" |\n| "+this.n41+" "+this.n42+" "+this.n43+" "+this.n44+" |"
    }
};

THREE.Matrix4.translationMatrix=function(e,g,h){
    var f=new THREE.Matrix4();
    f.n14=e;
    f.n24=g;
    f.n34=h;
    return f
    };
    
THREE.Matrix4.scaleMatrix=function(e,g,h){
    var f=new THREE.Matrix4();
    f.n11=e;
    f.n22=g;
    f.n33=h;
    return f
    };
    
THREE.Matrix4.rotationXMatrix=function(c){
    var e=new THREE.Matrix4();
    e.n22=e.n33=Math.cos(c);
    e.n32=Math.sin(c);
    e.n23=-e.n32;
    return e
    };
    
THREE.Matrix4.rotationYMatrix=function(c){
    var e=new THREE.Matrix4();
    e.n11=e.n33=Math.cos(c);
    e.n13=Math.sin(c);
    e.n31=-e.n13;
    return e
    };
    
THREE.Matrix4.rotationZMatrix=function(c){
    var e=new THREE.Matrix4();
    e.n11=e.n22=Math.cos(c);
    e.n21=Math.sin(c);
    e.n12=-e.n21;
    return e
    };
    
THREE.Matrix4.makeInvert=function(c){
    var e=new THREE.Matrix4();
    e.n11=c.n23*c.n34*c.n42-c.n24*c.n33*c.n42+c.n24*c.n32*c.n43-c.n22*c.n34*c.n43-c.n23*c.n32*c.n44+c.n22*c.n33*c.n44;
    e.n12=c.n14*c.n33*c.n42-c.n13*c.n34*c.n42-c.n14*c.n32*c.n43+c.n12*c.n34*c.n43+c.n13*c.n32*c.n44-c.n12*c.n33*c.n44;
    e.n13=c.n13*c.n24*c.n42-c.n14*c.n23*c.n42+c.n14*c.n22*c.n43-c.n12*c.n24*c.n43-c.n13*c.n22*c.n44+c.n12*c.n23*c.n44;
    e.n14=c.n14*c.n23*c.n32-c.n13*c.n24*c.n32-c.n14*c.n22*c.n33+c.n12*c.n24*c.n33+c.n13*c.n22*c.n34-c.n12*c.n23*c.n34;
    e.n21=c.n24*c.n33*c.n41-c.n23*c.n34*c.n41-c.n24*c.n31*c.n43+c.n21*c.n34*c.n43+c.n23*c.n31*c.n44-c.n21*c.n33*c.n44;
    e.n22=c.n13*c.n34*c.n41-c.n14*c.n33*c.n41+c.n14*c.n31*c.n43-c.n11*c.n34*c.n43-c.n13*c.n31*c.n44+c.n11*c.n33*c.n44;
    e.n23=c.n14*c.n23*c.n41-c.n13*c.n24*c.n41-c.n14*c.n21*c.n43+c.n11*c.n24*c.n43+c.n13*c.n21*c.n44-c.n11*c.n23*c.n44;
    e.n24=c.n13*c.n24*c.n31-c.n14*c.n23*c.n31+c.n14*c.n21*c.n33-c.n11*c.n24*c.n33-c.n13*c.n21*c.n34+c.n11*c.n23*c.n34;
    e.n31=c.n22*c.n34*c.n41-c.n24*c.n32*c.n41+c.n24*c.n31*c.n42-c.n21*c.n34*c.n42-c.n22*c.n31*c.n44+c.n21*c.n32*c.n44;
    e.n32=c.n14*c.n32*c.n41-c.n12*c.n34*c.n41-c.n14*c.n31*c.n42+c.n11*c.n34*c.n42+c.n12*c.n31*c.n44-c.n11*c.n32*c.n44;
    e.n33=c.n13*c.n24*c.n41-c.n14*c.n22*c.n41+c.n14*c.n21*c.n42-c.n11*c.n24*c.n42-c.n12*c.n21*c.n44+c.n11*c.n22*c.n44;
    e.n34=c.n14*c.n22*c.n31-c.n12*c.n24*c.n31-c.n14*c.n21*c.n32+c.n11*c.n24*c.n32+c.n12*c.n21*c.n34-c.n11*c.n22*c.n34;
    e.n41=c.n23*c.n32*c.n41-c.n22*c.n33*c.n41-c.n23*c.n31*c.n42+c.n21*c.n33*c.n42+c.n22*c.n31*c.n43-c.n21*c.n32*c.n43;
    e.n42=c.n12*c.n33*c.n41-c.n13*c.n32*c.n41+c.n13*c.n31*c.n42-c.n11*c.n33*c.n42-c.n12*c.n31*c.n43+c.n11*c.n32*c.n43;
    e.n43=c.n13*c.n22*c.n41-c.n12*c.n23*c.n41-c.n13*c.n21*c.n42+c.n11*c.n23*c.n42+c.n12*c.n21*c.n43-c.n11*c.n22*c.n43;
    e.n44=c.n12*c.n23*c.n31-c.n13*c.n22*c.n31+c.n13*c.n21*c.n32-c.n11*c.n23*c.n32-c.n12*c.n21*c.n33+c.n11*c.n22*c.n33;
    e.scale(1/c.determinant());
    return e
    };
    
THREE.Matrix4.makeFrustum=function(z,a,A,m,w,x){
    var y,b,s,c,t,u,v;
    y=new THREE.Matrix4();
    b=2*w/(a-z);
    s=2*w/(m-A);
    c=(a+z)/(a-z);
    t=(m+A)/(m-A);
    u=-(x+w)/(x-w);
    v=-2*x*w/(x-w);
    y.n11=b;
    y.n12=0;
    y.n13=c;
    y.n14=0;
    y.n21=0;
    y.n22=s;
    y.n23=t;
    y.n24=0;
    y.n31=0;
    y.n32=0;
    y.n33=u;
    y.n34=v;
    y.n41=0;
    y.n42=0;
    y.n43=-1;
    y.n44=0;
    return y
    };
    
THREE.Matrix4.makePerspective=function(p,r,m,j){
    var k,n,l,q;
    k=m*Math.tan(p*Math.PI/360);
    n=-k;
    l=n*r;
    q=k*r;
    return THREE.Matrix4.makeFrustum(l,q,n,k,m,j)
    };
    
THREE.Matrix4.makeOrtho=function(x,h,q,z,t,u){
    var w,p,r,s,m,v,y;
    w=new THREE.Matrix4();
    m=h-x;
    v=z-q;
    y=u-t;
    p=(h+x)/m;
    r=(z+q)/v;
    s=(u+t)/y;
    w.n11=2/m;
    w.n12=0;
    w.n13=0;
    w.n14=-p;
    w.n21=0;
    w.n22=2/v;
    w.n23=0;
    w.n24=-r;
    w.n31=0;
    w.n32=0;
    w.n33=-2/y;
    w.n34=-s;
    w.n41=0;
    w.n42=0;
    w.n43=0;
    w.n44=1;
    return w
    };
    
THREE.Vertex=function(e,c){
    this.position=e||new THREE.Vector3();
    this.normal=c||new THREE.Vector3();
    this.screen=new THREE.Vector3();
    this.__visible=true;
    this.toString=function(){
        return"THREE.Vertex ( position: "+this.position+", normal: "+this.normal+" )"
        }
    };

THREE.Face3=function(j,k,a,b,c){
    this.a=j;
    this.b=k;
    this.c=a;
    this.normal=b||new THREE.Vector3();
    this.screen=new THREE.Vector3();
    this.color=c||new THREE.Color(0);
    this.toString=function(){
        return"THREE.Face3 ( "+this.a+", "+this.b+", "+this.c+" )"
        }
    };

THREE.Face4=function(l,m,a,b,c,k){
    this.a=l;
    this.b=m;
    this.c=a;
    this.d=b;
    this.normal=c||new THREE.Vector3();
    this.screen=new THREE.Vector3();
    this.color=k||new THREE.Color(0);
    this.toString=function(){
        return"THREE.Face4 ( "+this.a+", "+this.b+", "+this.c+" "+this.d+" )"
        }
    };

THREE.UV=function(c,e){
    this.u=c||0;
    this.v=e||0
    };
    
THREE.UV.prototype={
    copy:function(b){
        this.u=b.u;
        this.v=b.v
        },
    toString:function(){
        return"THREE.UV ("+this.u+", "+this.v+")"
        }
    };

THREE.Geometry=function(){
    this.vertices=[];
    this.faces=[];
    this.uvs=[];
    this.computeNormals=function(){
        var f,l,n,p,q,j,m,k;
        for(f=0;f<this.vertices.length;f++){
            this.vertices[f].normal.set(0,0,0)
            }
            for(l=0;l<this.faces.length;l++){
            n=this.vertices[this.faces[l].a];
            p=this.vertices[this.faces[l].b];
            q=this.vertices[this.faces[l].c];
            j=new THREE.Vector3();
            m=new THREE.Vector3();
            k=new THREE.Vector3();
            j.sub(q.position,p.position);
            m.sub(n.position,p.position);
            j.crossSelf(m);
            if(!j.isZero()){
                j.normalize()
                }
                this.faces[l].normal=j;
            n.normal.addSelf(k);
            p.normal.addSelf(k);
            q.normal.addSelf(k);
            if(this.faces[l] instanceof THREE.Face4){
                this.vertices[this.faces[l].d].normal.addSelf(k)
                }
            }
        }
};

THREE.Camera=function(h,e,g,f){
    this.position=new THREE.Vector3(0,0,0);
    this.target={
        position:new THREE.Vector3(0,0,0)
        };
        
    this.projectionMatrix=THREE.Matrix4.makePerspective(h,e,g,f);
    this.up=new THREE.Vector3(0,1,0);
    this.matrix=new THREE.Matrix4();
    this.autoUpdateMatrix=true;
    this.updateMatrix=function(){
        this.matrix.lookAt(this.position,this.target.position,this.up)
        };
        
    this.toString=function(){
        return"THREE.Camera ( "+this.position+", "+this.target.position+" )"
        }
    };

THREE.Object3D=function(b){
    this.position=new THREE.Vector3();
    this.rotation=new THREE.Vector3();
    this.scale=new THREE.Vector3(1,1,1);
    this.matrix=new THREE.Matrix4();
    this.screen=new THREE.Vector3();
    this.material=b instanceof Array?b:[b];
    this.autoUpdateMatrix=true;
    this.updateMatrix=function(){
        this.matrix.identity();
        this.matrix.multiplySelf(THREE.Matrix4.translationMatrix(this.position.x,this.position.y,this.position.z));
        this.matrix.multiplySelf(THREE.Matrix4.rotationXMatrix(this.rotation.x));
        this.matrix.multiplySelf(THREE.Matrix4.rotationYMatrix(this.rotation.y));
        this.matrix.multiplySelf(THREE.Matrix4.rotationZMatrix(this.rotation.z));
        this.matrix.multiplySelf(THREE.Matrix4.scaleMatrix(this.scale.x,this.scale.y,this.scale.z))
        }
    };

THREE.Line=function(c,e){
    THREE.Object3D.call(this,e);
    this.geometry=c
    };
    
THREE.Line.prototype=new THREE.Object3D();
THREE.Line.prototype.constructor=THREE.Line;
THREE.Mesh=function(c,e){
    THREE.Object3D.call(this,e);
    this.geometry=c;
    this.flipSided=false;
    this.doubleSided=false;
    this.overdraw=false
    };
    
THREE.Mesh.prototype=new THREE.Object3D();
THREE.Mesh.prototype.constructor=THREE.Mesh;
THREE.Particle=function(b){
    THREE.Object3D.call(this,b);
    this.autoUpdateMatrix=false
    };
    
THREE.Particle.prototype=new THREE.Object3D();
THREE.Particle.prototype.constructor=THREE.Particle;
THREE.LineColorMaterial=function(g,e,f){
    this.lineWidth=f||1;
    this.color=new THREE.Color((e>=0?(e*255)<<24:4278190080)|g);
    this.toString=function(){
        return"THREE.LineColorMaterial ( color: "+this.color+", lineWidth: "+this.lineWidth+" )"
        }
    };

THREE.MeshBitmapUVMappingMaterial=function(b){
    this.bitmap=b;
    this.toString=function(){
        return"THREE.MeshBitmapUVMappingMaterial ( bitmap: "+this.bitmap+" )"
        }
    };

THREE.MeshColorFillMaterial=function(c,e){
    this.color=new THREE.Color((e>=0?(e*255)<<24:4278190080)|c);
    this.toString=function(){
        return"THREE.MeshColorFillMaterial ( color: "+this.color+" )"
        }
    };

THREE.MeshColorStrokeMaterial=function(g,e,f){
    this.lineWidth=f||1;
    this.color=new THREE.Color((e>=0?(e*255)<<24:4278190080)|g);
    this.toString=function(){
        return"THREE.MeshColorStrokeMaterial ( lineWidth: "+this.lineWidth+", color: "+this.color+" )"
        }
    };

THREE.MeshFaceColorFillMaterial=function(){
    this.toString=function(){
        return"THREE.MeshFaceColorFillMaterial ( )"
        }
    };

THREE.MeshFaceColorStrokeMaterial=function(b){
    this.lineWidth=b||1;
    this.toString=function(){
        return"THREE.MeshFaceColorStrokeMaterial ( lineWidth: "+this.lineWidth+" )"
        }
    };

THREE.ParticleBitmapMaterial=function(b){
    this.bitmap=b;
    this.offset=new THREE.Vector2();
    this.toString=function(){
        return"THREE.ParticleBitmapMaterial ( bitmap: "+this.bitmap+" )"
        }
    };

THREE.ParticleCircleMaterial=function(c,e){
    this.color=new THREE.Color((e>=0?(e*255)<<24:4278190080)|c);
    this.toString=function(){
        return"THREE.ParticleCircleMaterial ( color: "+this.color+" )"
        }
    };

THREE.Scene=function(){
    this.objects=[];
    this.addObject=function(b){
        this.objects.push(b)
        };
        
    this.removeObject=function(e){
        for(var g=0,f=this.objects.length;g<f;g++){
            if(e==this.objects[g]){
                this.objects.splice(g,1);
                return
            }
        }
        };
    
this.add=function(b){
    this.addObject(b)
    };
    
this.toString=function(){
    return"THREE.Scene ( "+this.objects+" )"
    }
};

THREE.Renderer=function(){
    var l=[],p=[],m=[],j=[],h=new THREE.Vector4(),n=new THREE.Matrix4();
    function k(a,b){
        return b.z-a.z
        }
        this.renderList=null;
    this.project=function(H,c){
        var v,G,I,F,a,K,b,J,L,D,M,N,O,P,E=0,e=0,g=0,f=0;
        this.renderList=[];
        if(c.autoUpdateMatrix){
            c.updateMatrix()
            }
            for(v=0,G=H.objects.length;v<G;v++){
            D=H.objects[v];
            if(D.autoUpdateMatrix){
                D.updateMatrix()
                }
                if(D instanceof THREE.Mesh){
                n.multiply(c.matrix,D.matrix);
                for(I=0,F=D.geometry.vertices.length;I<F;I++){
                    b=D.geometry.vertices[I];
                    b.screen.copy(b.position);
                    n.transform(b.screen);
                    c.projectionMatrix.transform(b.screen);
                    b.__visible=b.screen.z>0&&b.screen.z<1
                    }
                    for(a=0,K=D.geometry.faces.length;a<K;a++){
                    L=D.geometry.faces[a];
                    if(L instanceof THREE.Face3){
                        M=D.geometry.vertices[L.a];
                        N=D.geometry.vertices[L.b];
                        O=D.geometry.vertices[L.c];
                        if(M.__visible&&N.__visible&&O.__visible&&(D.doubleSided||(D.flipSided!=(O.screen.x-M.screen.x)*(N.screen.y-M.screen.y)-(O.screen.y-M.screen.y)*(N.screen.x-M.screen.x)<0))){
                            if(!l[E]){
                                l[E]=new THREE.RenderableFace3()
                                }
                                l[E].v1.copy(M.screen);
                            l[E].v2.copy(N.screen);
                            l[E].v3.copy(O.screen);
                            l[E].z=Math.max(M.screen.z,Math.max(N.screen.z,O.screen.z));
                            l[E].material=D.material;
                            l[E].overdraw=D.overdraw;
                            l[E].uvs=D.geometry.uvs[a];
                            l[E].color=L.color;
                            this.renderList.push(l[E]);
                            E++
                        }
                    }else{
                    if(L instanceof THREE.Face4){
                        M=D.geometry.vertices[L.a];
                        N=D.geometry.vertices[L.b];
                        O=D.geometry.vertices[L.c];
                        P=D.geometry.vertices[L.d];
                        if(M.__visible&&N.__visible&&O.__visible&&P.__visible&&(D.doubleSided||(D.flipSided!=((P.screen.x-M.screen.x)*(N.screen.y-M.screen.y)-(P.screen.y-M.screen.y)*(N.screen.x-M.screen.x)<0||(N.screen.x-O.screen.x)*(P.screen.y-O.screen.y)-(N.screen.y-O.screen.y)*(P.screen.x-O.screen.x)<0)))){
                            if(!p[e]){
                                p[e]=new THREE.RenderableFace4()
                                }
                                p[e].v1.copy(M.screen);
                            p[e].v2.copy(N.screen);
                            p[e].v3.copy(O.screen);
                            p[e].v4.copy(P.screen);
                            p[e].z=Math.max(M.screen.z,Math.max(N.screen.z,Math.max(O.screen.z,P.screen.z)));
                            p[e].material=D.material;
                            p[e].overdraw=D.overdraw;
                            p[e].uvs=D.geometry.uvs[a];
                            p[e].color=L.color;
                            this.renderList.push(p[e]);
                            e++
                        }
                    }
                }
            }
        }else{
    if(D instanceof THREE.Line){
        n.multiply(c.matrix,D.matrix);
        for(I=0,F=D.geometry.vertices.length;I<F;I++){
            b=D.geometry.vertices[I];
            b.screen.copy(b.position);
            n.transform(b.screen);
            c.projectionMatrix.transform(b.screen);
            b.__visible=b.screen.z>0&&b.screen.z<1;
            if(I>0){
                J=D.geometry.vertices[I-1];
                if(b.__visible&&J.__visible){
                    if(!m[g]){
                        m[g]=new THREE.RenderableLine()
                        }
                        m[g].v1.copy(b.screen);
                    m[g].v2.copy(J.screen);
                    m[g].z=Math.max(b.screen.z,J.screen.z);
                    m[g].material=D.material;
                    this.renderList.push(m[g]);
                    g++
                }
            }
        }
    }else{
    if(D instanceof THREE.Particle){
        h.set(D.position.x,D.position.y,D.position.z,1);
        c.matrix.transform(h);
        c.projectionMatrix.transform(h);
        D.screen.set(h.x/h.w,h.y/h.w,h.z/h.w);
        if(D.screen.z>0&&D.screen.z<1){
            if(!j[f]){
                j[f]=new THREE.RenderableParticle()
                }
                j[f].x=D.screen.x;
            j[f].y=D.screen.y;
            j[f].z=D.screen.z;
            j[f].rotation=D.rotation.z;
            j[f].scale.x=D.scale.x*Math.abs(h.x/h.w-(h.x+c.projectionMatrix.n11)/(h.w+c.projectionMatrix.n14));
            j[f].scale.y=D.scale.y*Math.abs(h.y/h.w-(h.y+c.projectionMatrix.n22)/(h.w+c.projectionMatrix.n24));
            j[f].material=D.material;
            j[f].color=D.color;
            this.renderList.push(j[f]);
            f++
        }
    }
}
}
}
this.renderList.sort(k)
}
};

THREE.CanvasRenderer=function(){
    THREE.Renderer.call(this);
    var B=document.createElement("canvas"),A=B.getContext("2d"),E,s,C,H,t=new THREE.Rectangle(),D=new THREE.Rectangle(),y=new THREE.Rectangle(),F=new THREE.Vector2(),G=new THREE.Vector2(),J=new THREE.Vector2(),u=new THREE.UV(),v=new THREE.UV(),w=new THREE.UV(),x=new THREE.UV();
    this.domElement=B;
    this.autoClear=true;
    this.setSize=function(a,b){
        E=a;
        s=b;
        C=E/2;
        H=s/2;
        B.width=E;
        B.height=s;
        t.set(-C,-H,C,H)
        };
        
    this.clear=function(){
        if(!D.isEmpty()){
            D.inflate(1);
            D.minSelf(t);
            A.setTransform(1,0,0,1,C,H);
            A.clearRect(D.getX(),-(D.getHeight()+D.getY()),D.getWidth(),D.getHeight());
            D.empty()
            }
        };
    
this.render=function(e,k){
    var f,ab,Z,j,X,ah,ac=Math.PI*2,p,r,m,q,ad,ag,aj,ak,l,n,Y,af,aa,ae,b,c,g,h,a,ai,W;
    this.project(e,k);
    if(this.autoClear){
        this.clear()
        }
        A.setTransform(1,0,0,-1,C,H);
    for(f=0,ab=this.renderList.length;f<ab;f++){
        X=this.renderList[f];
        y.empty();
        if(X instanceof THREE.RenderableParticle){
            p=X.x*C;
            r=X.y*H;
            for(Z=0,j=X.material.length;Z<j;Z++){
                ah=X.material[Z];
                if(ah instanceof THREE.ParticleCircleMaterial){
                    aa=X.scale.x*C;
                    ae=X.scale.y*H;
                    y.set(p-aa,r-ae,p+aa,r+ae);
                    if(!t.instersects(y)){
                        continue
                    }
                    A.save();
                    A.translate(p,r);
                    A.rotate(-X.rotation);
                    A.scale(aa,ae);
                    A.beginPath();
                    A.arc(0,0,1,0,ac,true);
                    A.closePath();
                    A.fillStyle=ah.color.__styleString;
                    A.fill();
                    A.restore()
                    }else{
                    if(ah instanceof THREE.ParticleBitmapMaterial){
                        a=ah.bitmap;
                        ai=a.width/2;
                        W=a.height/2;
                        b=X.scale.x*C;
                        c=X.scale.y*H;
                        aa=b*ai;
                        ae=c*W;
                        g=ah.offset.x*b;
                        h=ah.offset.y*c;
                        y.set(p+g-aa,r+h-ae,p+g+aa,r+h+ae);
                        if(!t.instersects(y)){
                            continue
                        }
                        A.save();
                        A.translate(p,r);
                        A.rotate(-X.rotation);
                        A.scale(b,-c);
                        A.translate(-ai+ah.offset.x,-W-ah.offset.y);
                        A.drawImage(a,0,0);
                        A.restore()
                        }
                    }
            }
        }else{
    if(X instanceof THREE.RenderableLine){
        p=X.v1.x*C;
        r=X.v1.y*H;
        m=X.v2.x*C;
        q=X.v2.y*H;
        y.addPoint(p,r);
        y.addPoint(m,q);
        if(!t.instersects(y)){
            continue
        }
        A.beginPath();
        A.moveTo(p,r);
        A.lineTo(m,q);
        A.closePath();
        for(Z=0,j=X.material.length;Z<j;Z++){
            ah=X.material[Z];
            if(ah instanceof THREE.LineColorMaterial){
                A.lineWidth=ah.lineWidth;
                A.lineJoin="round";
                A.lineCap="round";
                A.strokeStyle=ah.color.__styleString;
                A.stroke();
                y.inflate(A.lineWidth)
                }
            }
        }else{
    if(X instanceof THREE.RenderableFace3){
        X.v1.x*=C;
        X.v1.y*=H;
        X.v2.x*=C;
        X.v2.y*=H;
        X.v3.x*=C;
        X.v3.y*=H;
        if(X.overdraw){
            I(X.v1,X.v2);
            I(X.v2,X.v3);
            I(X.v3,X.v1)
            }
            p=X.v1.x;
        r=X.v1.y;
        m=X.v2.x;
        q=X.v2.y;
        ad=X.v3.x;
        ag=X.v3.y;
        y.addPoint(p,r);
        y.addPoint(m,q);
        y.addPoint(ad,ag);
        if(!t.instersects(y)){
            continue
        }
        for(Z=0,j=X.material.length;Z<j;Z++){
            ah=X.material[Z];
            if(ah instanceof THREE.MeshColorFillMaterial){
                A.beginPath();
                A.moveTo(p,r);
                A.lineTo(m,q);
                A.lineTo(ad,ag);
                A.lineTo(p,r);
                A.closePath();
                A.fillStyle=ah.color.__styleString;
                A.fill()
                }else{
                if(ah instanceof THREE.MeshColorStrokeMaterial){
                    A.beginPath();
                    A.moveTo(p,r);
                    A.lineTo(m,q);
                    A.lineTo(ad,ag);
                    A.lineTo(p,r);
                    A.closePath();
                    A.lineWidth=ah.lineWidth;
                    A.lineJoin="round";
                    A.lineCap="round";
                    A.strokeStyle=ah.color.__styleString;
                    A.stroke();
                    y.inflate(A.lineWidth)
                    }else{
                    if(ah instanceof THREE.MeshFaceColorFillMaterial){
                        A.beginPath();
                        A.moveTo(p,r);
                        A.lineTo(m,q);
                        A.lineTo(ad,ag);
                        A.lineTo(p,r);
                        A.closePath();
                        A.fillStyle=X.color.__styleString;
                        A.fill()
                        }else{
                        if(ah instanceof THREE.MeshFaceColorStrokeMaterial){
                            A.beginPath();
                            A.moveTo(p,r);
                            A.lineTo(m,q);
                            A.lineTo(ad,ag);
                            A.lineTo(p,r);
                            A.closePath();
                            A.lineWidth=ah.lineWidth;
                            A.lineJoin="round";
                            A.lineCap="round";
                            A.strokeStyle=X.color.__styleString;
                            A.stroke();
                            y.inflate(A.lineWidth)
                            }else{
                            if(ah instanceof THREE.MeshBitmapUVMappingMaterial){
                                a=ah.bitmap;
                                ai=a.width-1;
                                W=a.height-1;
                                u.copy(X.uvs[0]);
                                v.copy(X.uvs[1]);
                                w.copy(X.uvs[2]);
                                u.u*=ai;
                                u.v*=W;
                                v.u*=ai;
                                v.v*=W;
                                w.u*=ai;
                                w.v*=W;
                                z(a,p,r,m,q,ad,ag,u.u,u.v,v.u,v.v,w.u,w.v)
                                }
                            }
                    }
            }
        }
}
}else{
    if(X instanceof THREE.RenderableFace4){
        X.v1.x*=C;
        X.v1.y*=H;
        X.v2.x*=C;
        X.v2.y*=H;
        X.v3.x*=C;
        X.v3.y*=H;
        X.v4.x*=C;
        X.v4.y*=H;
        G.copy(X.v2);
        J.copy(X.v4);
        if(X.overdraw){
            I(X.v1,X.v2);
            I(X.v2,X.v4);
            I(X.v4,X.v1)
            }
            p=X.v1.x;
        r=X.v1.y;
        m=X.v2.x;
        q=X.v2.y;
        aj=X.v4.x;
        ak=X.v4.y;
        if(X.overdraw){
            I(X.v3,G);
            I(X.v3,J)
            }
            ad=X.v3.x;
        ag=X.v3.y;
        l=G.x;
        n=G.y;
        Y=J.x;
        af=J.y;
        y.addPoint(p,r);
        y.addPoint(m,q);
        y.addPoint(ad,ag);
        y.addPoint(aj,ak);
        if(!t.instersects(y)){
            continue
        }
        for(Z=0,j=X.material.length;Z<j;Z++){
            ah=X.material[Z];
            if(ah instanceof THREE.MeshColorFillMaterial){
                A.beginPath();
                A.moveTo(p,r);
                A.lineTo(m,q);
                A.lineTo(ad,ag);
                A.lineTo(aj,ak);
                A.lineTo(p,r);
                A.closePath();
                A.fillStyle=ah.color.__styleString;
                A.fill()
                }else{
                if(ah instanceof THREE.MeshColorStrokeMaterial){
                    A.beginPath();
                    A.moveTo(p,r);
                    A.lineTo(m,q);
                    A.lineTo(ad,ag);
                    A.lineTo(aj,ak);
                    A.lineTo(p,r);
                    A.closePath();
                    A.lineWidth=ah.lineWidth;
                    A.lineJoin="round";
                    A.lineCap="round";
                    A.strokeStyle=ah.color.__styleString;
                    A.stroke();
                    y.inflate(A.lineWidth)
                    }else{
                    if(ah instanceof THREE.MeshFaceColorFillMaterial){
                        A.beginPath();
                        A.moveTo(p,r);
                        A.lineTo(m,q);
                        A.lineTo(ad,ag);
                        A.lineTo(aj,ak);
                        A.lineTo(p,r);
                        A.closePath();
                        A.fillStyle=X.color.__styleString;
                        A.fill()
                        }else{
                        if(ah instanceof THREE.MeshFaceColorStrokeMaterial){
                            A.beginPath();
                            A.moveTo(p,r);
                            A.lineTo(m,q);
                            A.lineTo(ad,ag);
                            A.lineTo(aj,ak);
                            A.lineTo(p,r);
                            A.closePath();
                            A.lineWidth=ah.lineWidth;
                            A.lineJoin="round";
                            A.lineCap="round";
                            A.strokeStyle=X.color.__styleString;
                            A.stroke();
                            y.inflate(A.lineWidth)
                            }else{
                            if(ah instanceof THREE.MeshBitmapUVMappingMaterial){
                                a=ah.bitmap;
                                ai=a.width-1;
                                W=a.height-1;
                                u.copy(X.uvs[0]);
                                v.copy(X.uvs[1]);
                                w.copy(X.uvs[2]);
                                x.copy(X.uvs[3]);
                                u.u*=ai;
                                u.v*=W;
                                v.u*=ai;
                                v.v*=W;
                                w.u*=ai;
                                w.v*=W;
                                x.u*=ai;
                                x.v*=W;
                                z(a,p,r,m,q,aj,ak,u.u,u.v,v.u,v.v,x.u,x.v);
                                z(a,l,n,ad,ag,Y,af,v.u,v.v,w.u,w.v,x.u,x.v)
                                }
                            }
                    }
            }
        }
}
}
}
}
}
D.addRectangle(y)
}
A.setTransform(1,0,0,1,0,0)
};


};




THREE.RenderableFace3=function(){
    this.v1=new THREE.Vector2();
    this.v2=new THREE.Vector2();
    this.v3=new THREE.Vector2();
    this.z=null;
    this.color=null;
    this.material=null
    };
    
THREE.RenderableFace4=function(){
    this.v1=new THREE.Vector2();
    this.v2=new THREE.Vector2();
    this.v3=new THREE.Vector2();
    this.v4=new THREE.Vector2();
    this.z=null;
    this.color=null;
    this.material=null
    };
    
THREE.RenderableParticle=function(){
    this.x=null;
    this.y=null;
    this.z=null;
    this.rotation=null;
    this.scale=new THREE.Vector2();
    this.color=null;
    this.material=null
    };
    
THREE.RenderableLine=function(){
    this.v1=new THREE.Vector2();
    this.v2=new THREE.Vector2();
    this.z=null;
    this.color=null;
    this.material=null
    };
    
var TWEEN_MANAGER=TWEEN_MANAGER||(function(){
    var a,c,b=[];
    this.add=function(e){
        b.push(e)
        };
        
    this.remove=function(g){
        for(var f=0,e=b.length;f<e;f++){
            if(g==b[f]){
                b.splice(f,1);
                return
            }
        }
        };
    
this.update=function(){
    a=0;
    c=new Date().getTime();
    while(a<b.length){
        b[a].update(c)?a++:b.splice(a,1)
        }
    };

return this
})(),TWEEN=TWEEN||{};

TWEEN.Tween=function(b){
    TWEEN_MANAGER.add(this);
    var h=b,g={},c={},e=1000,a=new Date().getTime(),j=TWEEN.Easing.Elastic.EaseInOut,k=null,f=null;
    this.to=function(n,l){
        e=n*1000;
        for(var m in l){
            if(h[m]===null){
                continue
            }
            g[m]=h[m];
            c[m]=l[m]-h[m]
            }
            return this
        };
        
    this.delay=function(l){
        a+=l*1000;
        return this
        };
        
    this.easing=function(l){
        j=l;
        return this
        };
        
    this.onUpdate=function(l){
        k=l;
        return this
        };
        
    this.onComplete=function(l){
        f=l;
        return this
        };
        
    this.update=function(n){
        var m,l;
        if(n<a){
            return true
            }
            l=n-a;
        if(l>e){
            if(f!==null){
                f()
                }
                return false
            }
            for(m in c){
            h[m]=j(l,g[m],c[m],e)
            }
            if(k!==null){
            k()
            }
            return true
        };
        
    this.destroy=function(){
        TWEEN_MANAGER.remove(this)
        }
    };

TWEEN.Easing={
    Back:{},
    Elastic:{},
    Expo:{},
    Linear:{},
    Sine:{}
};


    

    





    var Boid=function(){
    var c=new THREE.Vector3(),g,f,h,k,j,e=100,a=3,b=0.1,l=false;
    this.position=new THREE.Vector3();
    this.velocity=new THREE.Vector3();
    g=new THREE.Vector3();
    this.setGoal=function(m){
        j=m
        };
        
    this.setAvoidWalls=function(m){
        l=m
        };
        
    this.setWorldSize=function(n,m,p){
        f=n;
        h=m;
        c;
        k=p
        };
        
    this.run=function(m){
        if(l){
            c.set(-f,this.position.y,this.position.z);
            c=this.avoid(c);
            c.multiplyScalar(5);
            g.addSelf(c);
            c.set(f,this.position.y,this.position.z);
            c=this.avoid(c);
            c.multiplyScalar(5);
            g.addSelf(c);
            c.set(this.position.x,-h,this.position.z);
            c=this.avoid(c);
            c.multiplyScalar(5);
            g.addSelf(c);
            c.set(this.position.x,h,this.position.z);
            c=this.avoid(c);
            c.multiplyScalar(5);
            g.addSelf(c);
            c.set(this.position.x,this.position.y,-k);
            c=this.avoid(c);
            c.multiplyScalar(5);
            g.addSelf(c);
            c.set(this.position.x,this.position.y,k);
            c=this.avoid(c);
            c.multiplyScalar(5);
            g.addSelf(c)
            }
            if(Math.random()>0.5){
            this.flock(m)
            }
            this.move()
        };
        
    this.flock=function(m){
        if(j){
            g.addSelf(this.reach(j,0.005))
            }
            g.addSelf(this.alignment(m));
        g.addSelf(this.cohesion(m));
        g.addSelf(this.separation(m))
        };
        
    this.move=function(){
        this.velocity.addSelf(g);
        var m=this.velocity.length();
        if(m>a){
            this.velocity.divideScalar(m/a)
            }
            this.position.addSelf(this.velocity);
        g.set(0,0,0)
        };
        
    this.checkBounds=function(){
        if(this.position.x>f){
            this.position.x=-f
            }
            if(this.position.x<-f){
            this.position.x=f
            }
            if(this.position.y>h){
            this.position.y=-h
            }
            if(this.position.y<-h){
            this.position.y=h
            }
            if(this.position.z>k){
            this.position.z=-k
            }
            if(this.position.z<-k){
            this.position.z=k
            }
        };
    
this.avoid=function(n){
    var m=new THREE.Vector3();
    m.copy(this.position);
    m.subSelf(n);
    m.multiplyScalar(1/this.position.distanceToSquared(n));
    return m
    };
    
this.repulse=function(n){
    var p=this.position.distanceTo(n);
    if(p<150){
        var m=new THREE.Vector3();
        m.copy(this.position);
        m.subSelf(n);
        m.multiplyScalar(0.5/this.position.distanceTo(n));
        g.addSelf(m)
        }
    };

this.reach=function(p,n){
    var m=new THREE.Vector3();
    m.copy(p);
    m.subSelf(this.position);
    m.multiplyScalar(n);
    return m
    };
    
this.alignment=function(s){
    var t,p=new THREE.Vector3(),r=0;
    for(var q=0,n=s.length;q<n;q++){
        if(Math.random()>0.6){
            continue
        }
        t=s[q];
        distance=t.position.distanceTo(this.position);
        if(distance>0&&distance<=e){
            p.addSelf(t.velocity);
            r++
        }
    }
    if(r>0){
    p.divideScalar(r);
    var m=p.length();
    if(m>b){
        p.divideScalar(m/b)
        }
    }
return p
};

this.cohesion=function(r){
    var u,m,p=new THREE.Vector3(),t=new THREE.Vector3(),s=0;
    for(var q=0,v=r.length;q<v;q++){
        if(Math.random()>0.6){
            continue
        }
        u=r[q];
        m=u.position.distanceTo(this.position);
        if(m>0&&m<=e){
            p.addSelf(u.position);
            s++
        }
    }
    if(s>0){
    p.divideScalar(s)
    }
    t.copy(p);
t.subSelf(this.position);
var n=t.length();
if(n>b){
    t.divideScalar(n/b)
    }
    return t
};

this.separation=function(q){
    var s,t,n=new THREE.Vector3(),r=new THREE.Vector3();
    for(var p=0,m=q.length;p<m;p++){
        if(Math.random()>0.6){
            continue
        }
        s=q[p];
        t=s.position.distanceTo(this.position);
        if(t>0&&t<=e){
            r.copy(this.position);
            r.subSelf(s.position);
            r.normalize();
            r.divideScalar(t);
            n.addSelf(r)
            }
        }
    return n
}
};

var Crow=function(){
    var b=this;
    THREE.Geometry.call(this);
    a(5,0,0);
    a(-5,-2,1);
    a(-5,0,0);
    a(-5,-2,-1);
    a(0,2,-6);
    a(0,2,6);
    a(2,0,0);
    a(-3,0,0);
    c(0,2,1);
    c(4,7,6);
    c(5,6,7);
    function a(e,g,f){
        b.vertices.push(new THREE.Vertex(new THREE.Vector3(e,g,f)))
        }
        function c(f,e,g){
        b.faces.push(new THREE.Face3(f,e,g))
        }
    };

Crow.prototype=new THREE.Geometry();
Crow.prototype.constructor=Crow;



function CanvasBirds(f,k,h){
    var b=k,p=h,v=b/2,c=p/2,s=100;
    var r,t,l,g,a,e;
    var j,m,u;
    this.container=f;
    q();
    function q(){
        e=new THREE.Vector3(0,1000,0);
        r=new THREE.Camera(75,b/p,1,10000);
        r.position.z=500;
        t=new THREE.Scene();
        g=[];
        m=[];
        l=new THREE.CanvasRenderer();
        l.domElement.style.position="absolute";
        l.domElement.style.left="0px";
        l.domElement.style.top="0px";
        l.setSize(b,p);
        f.style.left="0px";
        f.appendChild(l.domElement);
        document.addEventListener("mousemove",n,false);
        u=setInterval(w,100)
        }
        function w(){
        j=m[m.length]=new Boid();
        j.position.x=Math.random()*100+900;
        j.position.y=Math.random()*600-300;
        j.position.z=Math.random()*200-100;
        j.velocity.x=Math.random()*2+1;
        j.velocity.y=Math.random()*2+1;
        j.velocity.z=Math.random()*2+1;
        j.setAvoidWalls(true);
        j.setWorldSize(1000,800,300);
        a=g[g.length]=new THREE.Mesh(new Crow(),new THREE.MeshColorFillMaterial(0));
        a.phase=Math.floor(Math.random()*62.83);
        a.position=j.position;
        a.doubleSided=true;
        t.addObject(a);
        if(m.length>s){
            clearInterval(u)
            }
        }
    function n(x){
    e.x=x.clientX-v;
    e.y=-x.clientY+c
    }
    this.update=function(){
    var y;
    for(var z=0,x=g.length;z<x;z++){
        j=m[z];
        j.run(m);
        e.z=j.position.z;
        j.repulse(e);
        a=g[z];
        y=a.material[0].color;
        y.r=y.g=y.b=(500-a.position.z)/1000;
        y.updateStyleString();
        a.rotation.y=Math.atan2(-j.velocity.z,j.velocity.x);
        a.rotation.z=Math.asin(j.velocity.y/j.velocity.length());
        a.phase+=Math.max(0,a.rotation.z-0.5)+0.1;
        a.geometry.vertices[5].position.y=a.geometry.vertices[4].position.y=Math.sin(a.phase%62.83)*5
        }
        l.render(t,r)
    }
}



var bg,sequencer,lInterval,stats,counter;
var link,inputTime;
var layoutTopContainer;
var canvasBirds,titleWriter;
var launched=false;
var playing=true;
var resuming=false;
var addressFeedback,storedAddress;
var warning;
var final_drawing,isDrawing=false;
var codeHelper;

bg=document.getElementById("bg");


layoutTopContainer=document.getElementById("top");
if(window.location.hash){
    aSearch.value=window.location.hash.replace("#","")
        }
lInterval=setInterval(init,500);

function init(){
        clearInterval(lInterval);
        canvasBirds=new CanvasBirds(bg,window.innerWidth,window.innerHeight);
        lInterval=setInterval(loop,100/6);
}

function loop(){
    TWEEN_MANAGER.update();
    
    if(!isDrawing){
        canvasBirds.update()
        }else{
        }
}

