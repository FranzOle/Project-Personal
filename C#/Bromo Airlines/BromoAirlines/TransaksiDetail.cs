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
    
    public partial class TransaksiDetail
    {
        public int ID { get; set; }
        public int TransaksiHeaderID { get; set; }
        public string TitelPenumpang { get; set; }
        public string NamaLengkapPenumpang { get; set; }
    
        public virtual TransaksiHeader TransaksiHeader { get; set; }
    }
}
