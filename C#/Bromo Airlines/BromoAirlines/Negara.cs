//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace bromotestPT4
{
    using System;
    using System.Collections.Generic;
    
    public partial class Negara
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Negara()
        {
            this.Bandaras = new HashSet<Bandara>();
        }
    
        public int ID { get; set; }
        public string Nama { get; set; }
        public string IbukotaNegara { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Bandara> Bandaras { get; set; }
    }
}
