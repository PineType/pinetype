<script>
  import ApolloClient from "apollo-boost";
  import { setClient, getClient, query, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  const client = new ApolloClient({
    uri: "https://us-central1-pinetype.cloudfunctions.net/api",

    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });

  setClient(client);

  const GETNOTES = gql`
    {
      notes{
      id
      text
      metadata{
        date
        title
        weather{
          high
          low
          sky
          pressure
          wind
        }
        location{
          name
          lat
          lon
        }
        sentiment
        typingPattern{
          paragraphId
          speed
        }
      }
    }
  }
  `;
  
  const fetchNotes = query(client, { query: GETNOTES });

</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello!</h1>
  <!-- <button on:click={handleClick}>Try fetshing a note</button> -->
  {#await $fetchNotes}
    <p>...waiting for note to load</p>
  {:then note}
    <h3>Note #{note.data.notes[0].id}</h3>
    <h5>{note.data.notes[0].metadata.title} created on {note.data.notes[0].metadata.date}</h5>
    <p>{note.data.notes[0].text}</p>
    <small>Location: <a href="https://www.google.com/maps/@{note.data.notes[0].metadata.location[0].lat},{note.data.notes[0].metadata.location[0].lon},14z">{note.data.notes[0].metadata.location[0].name}</a></small>
    <p>
    <small>Weather: {note.data.notes[0].metadata.weather.low}˚C to {note.data.notes[0].metadata.weather.high}˚C, {note.data.notes[0].metadata.weather.sky}</small>
    </p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
