import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, ArrowRightLeftIcon, SearchIcon } from "lucide-react";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAirports } from "../../hooks/get-airports";
import { Daum } from "../../searchairports-types";
import { Button } from "@/components/ui/button";
import { Root } from "../../searchflights-types";

const FormSchema = z.object({
  type: z.enum(["roundtrip", "oneway", "multicity"]),
  cabinClass: z.enum(["economy", "premium_economy", "business", "first"]),
  adults: z.number().min(1, { error: "Select passengers" }),
  from: z.string().min(1, { error: "From is required" }),
  to: z.string().min(1, { error: "To is required" }),
  fromDate: z.string().min(1, { message: "From date is required" }),
  toDate: z.string().optional(),
});

interface Props {
  onSearchResult: (results: Root) => void;
}

export const FlightForm = ({ onSearchResult }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "roundtrip",
      cabinClass: "economy",
      adults: 1,
      from: "",
      to: "",
      fromDate: "",
      toDate: "",
    },
    shouldUnregister: true,
  });

  const [fromQuery, setFromQuery] = useState<string>("");
  const [fromAirport, setFromAirport] = useState<Daum | null>(null);
  const fromResults = useAirports(fromQuery);
  const [toQuery, setToQuery] = useState<string>("");
  const [toAirport, setToAirport] = useState<Daum | null>(null);
  const toResults = useAirports(toQuery);

  const [isFromDropdownVisible, setFromDropdownVisible] = useState(false);
  const [isToDropdownVisible, setToDropdownVisible] = useState(false);
  const handleArrowClick = () => {
    const tempQuery = fromQuery;
    setFromQuery(toQuery);
    setToQuery(tempQuery);
    form.setValue("from", toQuery);
    form.setValue("to", fromQuery);

    const tempAirport = fromAirport;
    setFromAirport(toAirport);
    setToAirport(tempAirport);
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!fromAirport || !toAirport) {
      console.error("Missing airport data");
      return;
    }

    const {
      navigation: {
        entityId: fromEntityId,
        relevantFlightParams: { skyId: originSkyId },
      },
    } = fromAirport;
    const {
      navigation: {
        entityId: toEntityId,
        relevantFlightParams: { skyId: destinationSkyId },
      },
    } = toAirport;

    const queryParams = new URLSearchParams({
      originSkyId,
      destinationSkyId,
      originEntityId: fromEntityId,
      destinationEntityId: toEntityId,
      date: values.fromDate,
      ...(values.type === "roundtrip" && values.toDate
        ? { returnDate: values.toDate }
        : {}),
      cabinClass: values.cabinClass,
      adults: values.adults.toString(),
      // sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    });

    try {
      const response = await fetch(
        `/api/search-flights?${queryParams.toString()}`
      );
      const data: Root = await response.json();
      onSearchResult(data);
    } catch (error) {
      console.error("Flight search failed", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-[#ffffff] shadow-2xl grid space-y-4 p-4 rounded-xl relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-2 justify-between md:justify-start">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="roundtrip">
                        <ArrowRightLeftIcon />
                        Round trip
                      </SelectItem>
                      <SelectItem value="oneway">
                        <ArrowRightIcon />
                        One way
                      </SelectItem>
                      <SelectItem value="multicity">
                        <ArrowRightLeftIcon />
                        Multi stop
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select no. of passengets" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2 </SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cabinClass"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cabinClass" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium_economy">
                        Premium economy
                      </SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First class</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          value={fromQuery}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFromQuery(val);
                            form.setValue("from", val);
                            setFromDropdownVisible(true);
                          }}
                          onFocus={() => {
                            if (fromResults.length > 0) {
                              setFromDropdownVisible(true);
                            }
                          }}
                          placeholder="Where from?"
                        />
                        {isFromDropdownVisible && (
                          <ul className="absolute bg-white z-10 w-full overflow-y-auto h-[150px] shadow rounded-md">
                            {fromResults.map((airport) => (
                              <li
                                key={airport.navigation.entityId}
                                onClick={() => {
                                  setFromAirport(airport);
                                  setFromQuery(airport.presentation.title);
                                  form.setValue(
                                    "from",
                                    airport.presentation.title
                                  );
                                  setFromDropdownVisible(false); // hide after select
                                }}
                                className="cursor-pointer hover:bg-gray-100 p-4 overflow-auto"
                              >
                                {airport.presentation.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                variant="outline"
                className="rounded-full"
                size="icon"
                type="button"
                onClick={handleArrowClick}
              >
                <ArrowRightLeftIcon className="text-muted-foreground" />
              </Button>
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          value={toQuery}
                          onChange={(e) => {
                            setToQuery(e.target.value);
                            form.setValue("to", e.target.value);
                            setToDropdownVisible(true);
                          }}
                          placeholder="Where to?"
                        />
                        {isToDropdownVisible && (
                          <ul className="absolute rounded-md z-10 bg-white overflow-y-auto h-[150px] w-full shadow">
                            {toResults.map((airport) => (
                              <li
                                key={airport.navigation.entityId}
                                onClick={() => {
                                  setToAirport(airport);
                                  setToQuery(airport.presentation.title);
                                  setToDropdownVisible(false);

                                  form.setValue(
                                    "from",
                                    airport.presentation.title
                                  );
                                }}
                                className="cursor-pointer hover:bg-gray-100 p-4"
                              >
                                {airport.presentation.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem className="w-full md:w-auto">
                    <FormControl>
                      <Input type="date" {...field} placeholder="Departure" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.watch("type") === "roundtrip" && (
                <FormField
                  control={form.control}
                  name="toDate"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-auto">
                      <FormControl>
                        <Input type="date" {...field} placeholder="Return" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="absolute top-11/12 left-1/2 transform -translate-x-1/2 bg-[#1a73e8] text-white hover:bg-[#1669d2] px-6 py-2 rounded-full"
        >
          <SearchIcon />
          Explore
        </Button>
      </form>
    </Form>
  );
};
