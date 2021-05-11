using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Common
{
    public static class ModelConverter
    {
        public static TTarget Convert<TSource, TTarget>(TSource Source)
        {
            TTarget result = Activator.CreateInstance<TTarget>();

            var sourceFields = typeof(TSource).GetFields();

            foreach(var sourceField in sourceFields)
            {
                var targetField = typeof(TTarget).GetField(sourceField.Name);
                if (targetField == null)
                    continue;

                var sourceValue = sourceField.GetValue(Source);
                targetField.SetValue(result, sourceValue);
            }

            var sourceProperties = typeof(TSource).GetProperties();

            foreach (var sourceProperty in sourceProperties)
            {
                var targetProperty = typeof(TTarget).GetProperty(sourceProperty.Name);
                if (targetProperty == null)
                    continue;

                var sourceValue = sourceProperty.GetValue(Source);
                targetProperty.SetValue(result, sourceValue);
            }

            return result;
        }

        public static TTarget[] Convert<TSource,TTarget>(TSource[] Source)
        {
            TTarget[] result = new TTarget[Source.Length];

            for (int i = 0; i < Source.Length; i++)
                result[i] = Convert<TSource,TTarget>(Source[i]);

            return result;
        }

    }
}
