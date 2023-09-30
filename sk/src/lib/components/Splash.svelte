<section class="flex flex-wrap gap-6 max-w-2xl p-10 mx-auto bg-blue-700 rounded-xl text-white">
  <div class="relative">
    <img class="w-42 h-42" src="/empty_logo.svg" alt="Film Night" />
    <div class="moon moon-1 absolute left-50% top-32%">
      <div class="disc" />
    </div>
    <div class="moon moon-2 absolute left-32% top-50%">
      <div class="disc" />
    </div>
    <div class="moon moon-3 absolute left-68% top-50%">
      <div class="disc" />
    </div>
    <div class="moon moon-4 absolute left-50% top-68%">
      <div class="disc" />
    </div>
  </div>
  <div class="flex-1 flex flex-col gap-2">
    <h2 class="font-bold text-3xl">Film Night</h2>
    <p>Maybe one day we will be able to decide what to watch.</p>
    <div class="mt-auto flex gap-1 justify-center">
      <a class="btn" href="/login">Login</a>
      <a class="btn btn-primary" href="/register">Sign up</a>
    </div>
  </div>
</section>

<style>
  .moon {
    --moon-bg: #254fd5;
    --moon-fg: #fff;

    width: 26px;
    height: 26px;
    border: 1px solid var(--moon-fg);
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--moon-fg);
    transform: translate(-50%, -50%) translateZ(0);
  }
  .moon::before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--moon-bg);
    width: 50%;
    height: 100%;
    animation: flip 2s 1s steps(2) infinite alternate;
  }

  .disc {
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    animation: rotate 4s linear infinite;
  }

  .moon-1::before {
    animation: flip 2s 1.5s steps(2) infinite alternate;
  }
  .moon-1 .disc {
    animation-delay: 500ms;
  }
  .moon-2::before {
    animation: flip 2s 1s steps(2) infinite alternate;
  }
  .moon-2 .disc {
    animation-delay: 0ms;
  }
  .moon-3::before {
    animation: flip 2s 2s steps(2) infinite alternate;
  }
  .moon-3 .disc {
    animation-delay: 1000ms;
  }
  .moon-4::before {
    animation: flip 2s 2.5s steps(2) infinite alternate;
  }
  .moon-4 .disc {
    animation-delay: 1500ms;
  }

  .disc::before,
  .disc::after {
    content: ' ';
    display: block;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: transform 4s;
    position: absolute;
    backface-visibility: hidden;
  }
  .disc::before {
    background-color: var(--moon-bg);
  }
  .disc::after {
    background-color: var(--moon-fg);
    transform: rotateY(180deg);
  }

  @keyframes rotate {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }

  @keyframes flip {
    0% {
      left: 0;
    }
    100% {
      left: 100%;
    }
  }
</style>
