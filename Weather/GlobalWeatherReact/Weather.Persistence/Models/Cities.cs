using System;
using System.Collections.Generic;

namespace Weather.Persistence.Models
{
    public partial class Cities
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string CountryId { get; set; }
        public DateTimeOffset AccessedDate { get; set; }
    }
}
